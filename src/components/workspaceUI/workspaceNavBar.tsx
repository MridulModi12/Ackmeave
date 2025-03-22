"use client";

import React from "react";
import { useParams } from "next/navigation";
import ShareButton from "./Shareicon";
import ChatIcon from "./Chaticon";

const WorkspaceNavBar = () => {
  const params = useParams();
  const roomId = params.id as string;

  return (
    <div className="flex justify-between p-4">
      <div>Ackmeave</div>
      <div className="flex gap-4">
        <div>
          <ShareButton />
        </div>
        <div>
          <ChatIcon roomId={roomId} />
        </div>
      </div>
    </div>
  );
};

export default WorkspaceNavBar;
