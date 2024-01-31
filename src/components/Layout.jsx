import React from "react";
import TopNav from "./TopNav";
import SideNav from "./SideNav";
import "../styles/Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="container">
      <TopNav />
      <div className="side-nav-container">
        <SideNav />
      </div>

      <div className="main-content">{children}</div>
    </div>
  );
};

export default Layout;
