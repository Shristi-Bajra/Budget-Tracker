import React from "react";

import { ReactNode } from "react";

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="container mx-auto my-32">{children}</div>;
};

export default MainLayout;
