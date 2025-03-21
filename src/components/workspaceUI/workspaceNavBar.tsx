import React from "react";

import ShareButton from "./Shareicon";
const WorkspaceNavBar = () => {
  return (
    <div className="flex justify-between p-4">
      <div>Ackmeave</div>
      <div className="flex gap-4">
        <div> <ShareButton/>
             </div>
        <div>Chat icon</div>
      </div>
    </div>
  );
};

export default WorkspaceNavBar;
