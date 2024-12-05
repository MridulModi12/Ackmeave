"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas, Rect } from "fabric";
import Tools from "./tools/tools";

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null); // Reference to parent div -> to set canvas size dynamically as per parent size
  const [canvas, setCanvas] = useState<Canvas | null>(null);

  useEffect(() => {
    const parent = containerRef.current;

    if (parent) {
      const width = parent.offsetWidth;
      const height = parent.offsetHeight;

      const initCanvas = new Canvas(canvasRef.current, {
        width,
        height,
      });
      //initCanvas.backgroundColor = "#fff";
      initCanvas.renderAll();
      setCanvas(initCanvas);

      // Cleanup
      return () => {
        initCanvas.dispose();
      };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full bg-zinc-800 h-[90vh] flex justify-center items-center rounded-xl"
    >
      {/* This canvas is directly used by Fabric.js */}
      <canvas
        ref={canvasRef}
        style={{
          borderRadius: "16px",
          overflow: "hidden",
        }}
      />
      <Tools canvas={canvas} /> {/* Floating toolbar */}
    </div>
  );
};

export default Whiteboard;
