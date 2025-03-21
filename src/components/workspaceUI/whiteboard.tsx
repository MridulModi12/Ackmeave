"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas, Path, Rect, Circle, IText, Triangle, Group } from "fabric";
import Tools from "./tools/tools";
import io from "socket.io-client";

const server = "https://ackmeave.onrender.com";
const socket = io(server);

export class Cursor extends Group {
  constructor(userId: string, username: string) {
    const pointer = new Triangle({
      width: 20,
      height: 20,
      fill: "#" + Math.floor(Math.random() * 16777215).toString(16),
      left: 0,
      top: 0,
      angle: -50,
    });

    const label = new IText(username, {
      fontSize: 12,
      fill: "white",
      left: 10,
      top: 10,
    });

    super([pointer, label]);
    this.id = userId;
  }
}

const Whiteboard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const cursors = useRef<Map<string, Cursor>>(new Map());

  useEffect(() => {
    const parent = containerRef.current;

    if (parent && canvasRef.current) {
      const width = parent.offsetWidth;
      const height = parent.offsetHeight;

      const initCanvas = new Canvas(canvasRef.current, {
        width,
        height,
      });

      setCanvas(initCanvas);

      // Emit drawing data
      initCanvas.on("path:created", (event) => {
        const path = event.path.toObject();
        console.log(path);
        socket.emit("draw", { path });
      });

      initCanvas.on("object:added", (event) => {
        const object = event.target;
        console.log(object);
        if (object) {
          socket.emit("object-added", {
            type: object.type,
            properties: object.toObject(),
          });
        }
      });

      initCanvas.on("object:modified", (event) => {
        console.log("object modified");
        console.log(event);
        const object = event.target;
        if (object) {
          socket.emit("object-modified", {
            id: object.id,
            properties: object.toObject(),
          });
        }
      });

      return () => {
        initCanvas.dispose();
      };
    }
  }, []);

  useEffect(() => {
    // Listen for new shapes added by others
    socket.on("new-add", (data) => {
      if (canvas) {
        let object;
        if (data.type === "rectangle") {
          object = new Rect(data.properties);
        } else if (data.type === "circle") {
          object = new Circle(data.properties);
        } else if (data.type === "text") {
          object = new IText(data.properties.text, data.properties);
        }

        if (object) {
          canvas.add(object);
          canvas.renderAll();
        }
      }
    });

    // Listen for object modifications
    socket.on("modified", (data) => {
      if (canvas) {
        const object = canvas.getObjects().find((obj) => obj.id === data.id);
        if (object) {
          object.set(data.properties);
          canvas.renderAll();
        }
      }
    });
    socket.on("remote-draw", (data) => {
      if (canvas) {
        const path = new Path(data.path.path, data.path);
        canvas.add(path);
        canvas.renderAll();
      }
    });

    return () => {
      socket.off("new-add");
      socket.off("new-modification");
    };
  }, [canvas]);

  useEffect(() => {
    if (canvas) {
      canvas.on("object:modified", (e) => {
        if (e.target) {
          socket.emit("object-modified", {
            id: e.target.id, // Ensure each object has a unique ID
            properties: e.target.toObject(),
          });
        }
      });
    }
  }, [canvas]);

  useEffect(() => {
    if (canvas) {
      canvas.on("mouse:move", (event) => {
        console.log("mouse moved");
        const pointer = canvas.getPointer(event.e);
        socket.emit("cursor:move", {
          x: pointer.x,
          y: pointer.y,
          userId: socket.id,
          username: "User", // You can replace this with actual username
        });
      });

      socket.on("cursor:moved", (data) => {
        console.log("cursor moved socket");
        if (data.userId !== socket.id) {
          let cursor = cursors.current.get(data.userId);

          if (!cursor) {
            cursor = new Cursor(data.userId, data.username);
            cursors.current.set(data.userId, cursor);
            canvas.add(cursor);
          }

          cursor.set({
            left: data.x,
            top: data.y,
          });

          canvas.renderAll();
        }
      });

      socket.on("user:disconnected", (userId) => {
        const cursor = cursors.current.get(userId);
        if (cursor) {
          canvas.remove(cursor);
          cursors.current.delete(userId);
          canvas.renderAll();
        }
      });
    }

    return () => {
      socket.off("cursor:moved");
      socket.off("user:disconnected");
    };
  }, [canvas]);

  return (
    <div
      ref={containerRef}
      className="w-full bg-zinc-800 h-[90vh] flex justify-center items-center rounded-xl"
    >
      <canvas
        ref={canvasRef}
        style={{
          borderRadius: "16px",
          overflow: "hidden",
        }}
      />
      <Tools canvas={canvas} socket={socket} />
    </div>
  );
};

export default Whiteboard;
