import React from "react";
import SideBar from "./LeftSidemenu.js";
import "./LeftSidemenu.css";
import logo from "./img/logo.png";
import Languages from "./LangDropdown";
import SurahName from "./DetailHeaderSurahName";
import Verse from "./DetailHeaderVersenNum";
import Search from "./DetailHeaderSearchbar";
import Settings from "./Settings";
import { Link } from "react-router-dom";


const Head = {
  height: "70px"
};
const imgStyle = {
  paddingLeft: 15,
  paddingRight: 15,
  marginLeft: "60px",
  width: "156px"
};
    
function Header(props){
return (
  <header class="detailheader" style={{padding:15}}>
    <div className="col-md-2 float-left sidebar_header">
      <SideBar /> 
      <Link to="/">
        <img src={logo} alt="logo" style={imgStyle} />
      </Link>
    </div>
    <div className="col-md-7 float-left middlebar_header">
      <div className="col-md-2 float-left">
        <SurahName ChapData={props.ChapData}/>
      </div>
      <div  className="col-md-2 float-left">
        <Verse VerseTotal={props.VerseTotal}/>
      </div>
      <div className="col-md-8 float-left p-0 ">
        <Search />
      </div>
    </div>
    <div className="col-md-3 float-left right_header">
      <div  className="col-md-6 float-left text-right">
        <Languages />
      </div>
      <div  className="col-md-6 float-left text-right">
        <Settings />
      </div>
    </div>
    {/* for mobile devices */}
    <div className="col-md-12 float-left middlebar_header_mobile">
      <div className="col-md-12 float-left p-0 ">
        <Search />
      </div>
    </div>
    <div className="col-md-3 float-left right_header_mobile  p-0 ">
      <div className="col-4 float-left p-0 pr-1 surah_dropdown">
        <SurahName ChapData={props.ChapData}/>
      </div>
      <div  className="col-3 float-left p-0 pr-1 verse_dropdown">
        <Verse VerseTotal={props.VerseTotal}/>
      </div>
      <div  className="col-4 float-left p-0 pr-1">
        <Languages />
      </div>
      <div  className="col-1 float-left p-0 setting_popup">
        <Settings />
      </div>
    </div>
  </header>
  
);
}
export default Header;