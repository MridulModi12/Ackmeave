import React from "react";
import Tools from "./tools/tools";

const Whiteboard = () => {
  return (
    <div className="w-full bg-zinc-900 h-[90vh] flex justify-center items-center rounded-xl">
      sketchboard
      <Tools /> {/* floating toolbar */}
    </div>
  );
};

export default Whiteboard;
