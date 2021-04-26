import React from "react";
import { slide as Menu } from "react-burger-menu";
import logo from "./img/logo.png";
import "./LeftSidemenu.css";
import {Link} from "react-router-dom"
import {FormattedMessage} from "react-intl";

const menuStyle = {
  textDecoration: "none",
  fontSize: "16px",
  paddingLeft:"20px",
  
};
const DevStyle = {
  textDecoration: "none",
  fontSize: "16px",
  paddingLeft:"13px",
  
};
const marg = {
  marginTop: "2vw",
  textDecoration: "none",
  fontSize: "16px",
  paddingLeft:"20px"
  
};

export default props => {
  return (
    <Menu {...props} >
      <Link to="/">
      <img src={logo} alt="Islam Check" style={{width: "200px"}} />
      </Link >

      <Link to="/" className="Banner" style={marg}>
        <i className="fas fa-home" /> &nbsp;&nbsp;&nbsp; <FormattedMessage id="Home"/>
        </Link >
      <div className="dropdown-divider" />

     
     <a href="http://www.islamcheck.com/"><p  style={{color: "#747474", textAlign: "center"}}>www.islamcheck.com</p></a>
    </Menu>
  );
};
