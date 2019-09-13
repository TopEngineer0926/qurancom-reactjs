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

      <Link to="/" className="Banner" style={menuStyle}>
        <i className="fas fa-question-circle" />
        &nbsp;&nbsp;&nbsp; <FormattedMessage id="Feed"/> &amp;  <FormattedMessage id="Help"/> 
      </Link>

      <Link to="/" className="Banner" style={menuStyle}>
        <i className="fas fa-mobile-alt" /> &nbsp;&nbsp;&nbsp;&nbsp;<FormattedMessage id="Mobile"/>
      </Link>

      <Link to="/" className="Banner" style={menuStyle}>
        <i className="fas fa-dollar-sign" />
        &nbsp;&nbsp;&nbsp; &nbsp;<FormattedMessage id="Contri"/>
      </Link>
      <Link to="/"className="Banner" style={DevStyle}>
        <i className="fas fa-laptop" />
        &nbsp;&nbsp; &nbsp;<FormattedMessage id="Dev"/>
      </Link>
    </Menu>
  );
};
