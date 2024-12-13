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

  /**
   * exportPdfBtn.addEventListener('click', async () => {
            const pdfDoc = await PDFLib.PDFDocument.create();
            const page = pdfDoc.addPage([canvas.width, canvas.height]);
            const canvasImg = await pdfDoc.embedPng(canvas.toDataURL({ format: 'png' }));
            const { width, height } = canvasImg.scale(0.5);
            page.drawImage(canvasImg, {
                x: 0,
                y: 0,
                width,
                height,
            });
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'canvas_image.pdf';
            link.click();
        });
   */

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
