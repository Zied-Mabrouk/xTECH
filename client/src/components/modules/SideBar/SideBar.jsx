import React from "react";
import "./SideBar.scss";

const SideBar = ({active=true,classname,children}) => {
 
  return (
    <div className={"sidebar"+(classname?" "+classname:"")+(active?" active":"")}>
      {children}
    </div>
  );
};

export default SideBar;
