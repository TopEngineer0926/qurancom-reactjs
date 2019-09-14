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
        <DropdownItem className="stripe"  onClick={()=>{ setLang('en'); localStorage.setItem('lang','en')  }}>English</DropdownItem>
        <DropdownItem className="stripe"  onClick={()=>{setLang('de'); localStorage.setItem('lang','de'); 
        console.log("lang:"+localStorage.getItem('lang')) }} >Deutsch</DropdownItem>
        <DropdownItem className="stripe" onClick={()=>{ localStorage.setItem('lang','indo'); setLang('indo')}}>Bahasa Indonesia</DropdownItem>
        <DropdownItem className="stripe"onClick={()=>{ localStorage.setItem('lang','ar'); setLang('ar')}}>عربى</DropdownItem>
        <DropdownItem className="stripe"onClick={()=>{ localStorage.setItem('lang','tr'); setLang('tr')}}>Türk</DropdownItem>
        <DropdownItem className="stripe" onClick={()=>{localStorage.setItem('lang','fr'); setLang('fr')}} >Francais</DropdownItem>
        <DropdownItem className="stripe"onClick={()=>{ localStorage.setItem('lang','ur'); setLang('ur')}}>اردو</DropdownItem>
      </DropdownMenu>
    
    </UncontrolledDropdown>
  );
}
export default Drop;
