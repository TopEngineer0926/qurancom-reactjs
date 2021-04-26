import React from "react";
import SideBar from "./LeftSidemenu.js";
import "./LeftSidemenu.css";
import logo from "./img/logo.png";
import Dropdown from "./LangDropdown";

function Header(){
return (
  <header id="hd" className=" header indexheader head">
      <SideBar /> 
      <a href="#">
      <img src={logo} alt="logo" className="header_logo"/>
      </a>
      <span className="header_lang">
        <Dropdown />
      </span>
  </header>
);
}
export default Header;