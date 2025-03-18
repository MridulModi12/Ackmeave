import React from "react";
import WorkspaceNavBar from "@/components/workspaceUI/workspaceNavBar";
import Whiteboard from "@/components/workspaceUI/whiteboard";

const page = () => {
  return (
    <div className="flex flex-col h-full px-2">
      <WorkspaceNavBar />
      <Whiteboard />
    </div>
  );
};

export default page;
