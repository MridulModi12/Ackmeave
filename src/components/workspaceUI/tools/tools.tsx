import {
  Canvas,
  Rect,
  PencilBrush,
  IText,
  Line,
  Group,
  Triangle,
} from "fabric";
import React, { useEffect, useState } from "react";
import {
  ArrowBigRight,
  Circle,
  Pencil,
  RectangleHorizontal,
  TypeIcon,
  TypeOutline,
} from "lucide-react";
import { v4 as uuid } from "uuid";

const Tools = ({ canvas, socket }: { canvas: Canvas | null; socket: any }) => {
  const [isDrawingMode, setDrawingMode] = useState(false);

  const toggleDrawingMode = () => {
    if (canvas) {
      setDrawingMode(!isDrawingMode);
      canvas.isDrawingMode = !isDrawingMode;
    }
  };

  useEffect(() => {
    if (canvas) {
      const brush = new PencilBrush(canvas);
      brush.color = "white";
      brush.width = 5;
      canvas.freeDrawingBrush = brush;
    }
  }, [canvas]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Delete" && canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        canvas.remove(activeObject);
      }
    } else if (event.key === "r" && canvas) {
      addReactangle();
    }
  };

  const addReactangle = () => {
    if (canvas) {
      const rect = new Rect({
        left: 100,
        top: 100,
        width: 200,
        height: 100,
        fill: "transparent",
        stroke: "white",
        strokeWidth: 3,
      });
      canvas.add(rect);
      canvas.renderAll();
      socket.emit("object-added", {
        id: rect.id,
        type: "rectangle",
        properties: rect.toObject(),
      });
    }
  };

  const addArrow = () => {
    if (canvas) {
      const line = new Line([50, 100, 200, 100], {
        left: 100,
        top: 100,
        stroke: "white",
        strokeWidth: 3,
        selectable: false,
      });

      const triangle = new Triangle({
        left: line.x2 + 50,
        top: line.y2,
        originX: "center",
        originY: "center",
        angle: 90,
        width: 20,
        height: 20,
        fill: "white",
        selectable: false,
      });

      const arrow = new Group([line, triangle], {
        left: 100,
        top: 100,
        selectable: true,
      });

      canvas.add(arrow);
      canvas.renderAll();

      socket.emit("object-added", {
        id: arrow.id,
        type: "arrow",
        properties: arrow.toObject(),
      });
    }
  };

  const addText = () => {
    if (canvas) {
      console.log("Canvas is defined");
      const text = new IText("Edit this text");
      canvas.add(text);
      canvas.centerObject(text);
      canvas.setActiveObject(text);
      console.log("Text added to canvas");
    } else {
      console.log("Canvas is not defined");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [canvas]);

  return (
    <div className="fixed bottom-4 p-3 bg-black rounded-full">
      <div className="flex justify-center items-center gap-3 cursor-pointer">
        {isDrawingMode ? (
          <div
            onClick={toggleDrawingMode}
            className="bg-slate-800 rounded-full border p-2"
          >
            <Pencil size={15} strokeWidth={3} />
          </div>
        ) : (
          <div onClick={toggleDrawingMode} className="rounded-full border p-2">
            <Pencil size={15} strokeWidth={3} />
          </div>
        )}
        <div className="rounded-full border p-2">
          <RectangleHorizontal
            onClick={addReactangle}
            size={15}
            strokeWidth={3}
          />
        </div>
        <div className="rounded-full border p-2">
          <Circle size={15} strokeWidth={3} />
        </div>
        <div onClick={addText} className="rounded-full border p-2">
          <TypeOutline size={15} strokeWidth={2} />
        </div>
        <div onClick={addArrow} className="rounded-full border p-2">
          <ArrowBigRight size={15} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
};

export default Tools;
