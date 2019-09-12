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
  padding: "15px",
  marginLeft: "60px",
  height: "65px",
  width: "156px"
};
const SettingStyle = {
  position: "absolute",
  right: "20px",
  top: "15px",
  bottom: "20px",
  fontSize: "14px",
  color:"#56c0d0"

};
const LangStyle = {
  position: "absolute",
  right: "120px",
  top: "15px",
  bottom: "20px",
  fontSize: "14px"
};
const FatihaStyle = {
  position: "absolute",
  left: "210px",
  top: "15px",
  bottom: "20px",
  fontSize: "14px",  
  };
  const VerseStyle = {
    position: "absolute",
    left: "320px",
    top: "15px",
    bottom: "20px",
    fontSize: "14px",  
    };
    const SearchStyle = {
      position: "absolute",
      left: "420px",
      top: "15px",
      bottom: "20px",
      fontSize: "14px",  
      };
    
function Header(props){
return (
  <header class="detailheader">
  <nav >
    <nav >
      <div>
   
          <SideBar /> 
              <Link to="/">
          <img src={logo} alt="logo" style={imgStyle} />
          </Link>
         <span style={FatihaStyle}> 
         <SurahName ChapData={props.ChapData}/>
         </span>
         <span style={VerseStyle}>
            <Verse VerseTotal={props.VerseTotal}/>
          </span>
          <span style={SearchStyle}>
            <Search />
          </span>
          </div>
          </nav>
          {/* NAVBAR 2 */}
     
         <span style={LangStyle}>
            <Languages />
           
          </span>
          <span style={SettingStyle}>
           <Settings />
           
          </span>
        
        </nav>
      
      
      </header>
);
}
export default Header;