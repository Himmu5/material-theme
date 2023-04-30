import React from "react";
import SidePanel from "./SidePanel";
import ThemeHOC from "@components/common/ThemeHOC";

type LayoutProps = {
  children: any;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeHOC>
      <main>
        <SidePanel />
        {children}
      </main>
    </ThemeHOC>
  );
};

export default Layout;
