import React from "react";
import SideBar from "./LeftSidemenu.js";
import "./LeftSidemenu.css";
import logo from "./img/logo.png";
import Dropdown from "./LangDropdown";
import {Link} from "react-router-dom";

const Head = {
  height: "70px"
};
const imgStyle = {
  padding: "15px",
  marginLeft: "60px",
  height: "65px",
  width: "156px"
};
const LangStyle = {
  position: "absolute",
  right: "20px",
  top: "15px",
  bottom: "20px",
  fontSize: "14px"
};


function Header(){
return (
<header id="hd" className=" header indexheader" style={Head}>

        <div>
          <SideBar /> 
          <a href="#">
          <img src={logo} alt="logo" style={imgStyle} />
          </a>

          <a style={LangStyle}>
            <Dropdown />
          </a>
        </div>
     
      </header>
);
}
export default Header;