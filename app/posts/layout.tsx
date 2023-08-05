import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      Navigate to top
      <div>{children}</div>
    </div>
  );
};

export default layout;
