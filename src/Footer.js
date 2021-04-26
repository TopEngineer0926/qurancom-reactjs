import React,{useContext} from "react";
import logo from "./img/logo-footer.png";
import {LangContext} from "./Store";
import {FormattedMessage} from "react-intl";
import {SurahContext} from "./Store"
import {Link} from "react-router-dom";

const cursor={
  cursor: "pointer",
}



function Footer() {
  const [lang, setLang]=useContext(LangContext);
  const [Surah, setSurahNo]=useContext(SurahContext);
  return (
    <footer id="footer">
           <div className="container">
             <div className="row">
               <div className="col-sm-12 col-md-6">
                 <div className="footerlogo">
                    <img src={logo} alt="Islam Check" />
                    </div>
                    <a className="noLine" href="http://www.islamcheck.com/"><p  style={cursor, { color: "#ffff", textAlign: "center"}}>www.islamcheck.com</p></a>
                    </div>
               <div className="col-sm-12 col-md-6">
                 <div className="row">
                   <div className="col-sm-6 col-md-3">
                    
                  <ul className="footerstyle">
                    <li style={cursor}>
                      <a className="small" onClick={()=>{setLang('en')}}>English
                      </a>
                    </li>
                    <li style={cursor}>
                      <a className="small" onClick={()=>{ setLang('de')}} >Deutsch
                      </a>
                    </li>
                    <li style={cursor}>
                      <a className="small" onClick={()=>{ setLang('ur')}}>
                      اردو
                      </a>
                    </li>
                    <li style={cursor}>
                      <a  className="small" onClick={()=>{ setLang('ar')}}>عربى
                      </a>
                    </li>
                    <li style={cursor}>
                      <a  className="small" onClick={()=>{ setLang('da')}}>Dansk
                      </a>
                    </li>
                  </ul>
                   </div>
                   <div className="col-sm-6 col-md-3">
                     
                  <ul className="footerstyle">
                    
                    <li style={cursor}>
                      <a  className="small" onClick={()=>{ setLang('tr')}}>Türkçe
                      </a>
                    </li>
                    <li style={cursor}>
                      <a  className="small" onClick={()=>{ setLang('fr')}} >Français
                      </a>
                    </li>
                    <li style={cursor}>
                      <a  className="small" onClick={()=>{ setLang('bg')}} >български
                      </a>
                    </li>
                    <li style={cursor}>
                      <a  className="small" onClick={()=>{ setLang('fa')}}>فارسی
                      </a>
                    </li>
                    <li style={cursor}>
                      <a  className="small" onClick={()=>{ setLang('fi')}} >Suomi
                      </a>
                    </li>
                  </ul>
                   </div>
                   <div className="col-sm-6 col-md-3">
                     
                  <ul className="footerstyle">
                    <li style={cursor}>
                      <a  className="small"onClick={()=>{setLang('bs')}}>Bosanski
                      </a>
                    </li>
                    <li style={cursor}>
                      <a  className="small" onClick={()=>{ setLang('nl')}}>Nederlands
                      </a>
                    </li>
                    <li style={cursor}>
                      <a  className="small" onClick={()=>{ setLang('ru')}} >Русский
                      </a>
                    </li>
                    <li style={cursor}>
                      <a  className="small" onClick={()=>{ setLang('it')}} >Italiano
                      </a>
                    </li>
                    <li className="langlinks" style={cursor}>
                      <a className="small" onClick={()=>{ setLang('sq')}} >Gjuhë Shqipe
                      </a>
                    </li>
                  </ul>

                   </div>
                   <div className="col-sm-6 col-md-3">
                     
                  <ul className="footerstyle">
                    <li style={cursor}>
                      <a  className="small"onClick={()=>{setLang('es')}}>Español
                      </a>
                    </li>
                    <li style={cursor}>
                      <a  className="small" onClick={()=>{ setLang('pt')}}>Português
                      </a>
                    </li>
                    <li style={cursor}>
                      <a  className="small" onClick={()=>{ setLang('sv')}} >Svenska
                      </a>
                    </li>
                    <li style={cursor}>
                      <a  className="small" onClick={()=>{ setLang('no')}} >Norsk
                      </a>
                    </li>
		   
                    <li className="langlinks" style={cursor}>
                      <a  className="small"onClick={()=>{setLang('id')}}>Bahasa Indonesia
                      </a>
                    </li>
                  </ul>
                   </div>
                 </div>
                 
                 </div>     
                  

             </div>
           </div>
         
         
              
             
                 
               
                
                
                
              
              
                
              
              
     
    
    </footer>
  );
}

export default Footer;
