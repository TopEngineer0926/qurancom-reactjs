import React,{useContext} from "react";
import {LangContext} from "./index";
import {FormattedMessage} from "react-intl";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "./LangDropdown.css";



const Style = {
  textDecoration: "none",
  fontSize: "14px",
  color: "#56c0d0"
};


function Drop() {
  
  const [lang, setLang]=useContext(LangContext);
  return (
    
    <UncontrolledDropdown>
    
      <DropdownToggle nav caret style={Style}>
      <FormattedMessage id="Langs"/>
   
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem className="stripe"  onClick={()=>{console.log(lang); setLang('en')}}>English</DropdownItem>
        <DropdownItem className="stripe"  onClick={()=>{console.log(lang); setLang('de')}} >Deutsch</DropdownItem>
        <DropdownItem className="stripe" onClick={()=>{console.log(lang); setLang('indo')}}>Bahasa Indonesia</DropdownItem>
        <DropdownItem className="stripe"onClick={()=>{console.log(lang); setLang('ar')}}>عربى</DropdownItem>
        <DropdownItem className="stripe"onClick={()=>{console.log(lang); setLang('tr')}}>Türk</DropdownItem>
        <DropdownItem className="stripe" onClick={()=>{console.log(lang); setLang('fr')}} >Francais</DropdownItem>
        <DropdownItem className="stripe"onClick={()=>{console.log(lang); setLang('ur')}}>اردو</DropdownItem>
      </DropdownMenu>
    
    </UncontrolledDropdown>
  );
}
export default Drop;
