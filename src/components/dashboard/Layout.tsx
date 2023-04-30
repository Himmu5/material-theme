import React from "react";
import SidePanel from "./SidePanel";

type LayoutProps = {
  children: any;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <main>
        <SidePanel />
        {children}</main>
    </>
  );
};

export default Layout;
