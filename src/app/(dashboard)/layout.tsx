import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;
