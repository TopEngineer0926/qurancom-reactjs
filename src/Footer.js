import React,{useContext} from "react";
import logo from "./img/logo.png";
import {LangContext} from "./index";
import {FormattedMessage} from "react-intl";

const cursor={
  cursor: "pointer",
}
function Footer() {
  const [lang, setLang]=useContext(LangContext);
  return (
    <footer id="footer">
      <div class="container">
        <div class="row d-flex justify-content-between">
          <div class="col-sm-12 col-md-12 col-lg-8">
            <div class="footer-content-left" id="mobileFooterContentLeft">
              <div class="row">
                <div class="col-3 col-sm-3 col-md-3 col-lg-3">
                  <p class="lead"><FormattedMessage id="Site"/></p>
                  <ul>
                    <li>
                      <a  class="small">
                        <FormattedMessage id="Prayer"/>
                      </a>
                    </li>
                    <li>
                      <a  class="small">
                      <FormattedMessage id="About"/>
                      </a>
                    </li>
                    <li>
                      <a  class="small">
                      <FormattedMessage id="Contact"/>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="col-3 col-sm-3 col-md-3 col-lg-3">
                  <p class="lead"><FormattedMessage id="Quick"/></p>
                  <ul>
                    <li>
                      <a  class="small">
                        Surah Yaseen
                      </a>
                    </li>
                    <li>
                      <a  class="small">
                        Surah Rahman
                      </a>
                    </li>
                    <li>
                      <a  class="small">
                        Surah Mulak
                      </a>
                    </li>
                    <li>
                      <a  class="small">
                        Ayatul Kursi
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="col-3 col-sm-3 col-md-3 col-lg-2">
                  <p class="lead"><FormattedMessage id="Langs"/></p>
                  <ul>
                    <li style={cursor}>
                      <a class="small" onClick={()=>{console.log(lang); setLang('en')}}>English
                      </a>
                    </li>
                    <li style={cursor}>
                      <a class="small" onClick={()=>{console.log(lang); setLang('de')}} >Deutsch
                      </a>
                    </li>
                    <li style={cursor}>
                      <a class="small" onClick={()=>{console.log(lang); setLang('ur')}}>
                        Urdu
                      </a>
                    </li>
                    <li style={cursor}>
                      <a  class="small" onClick={()=>{console.log(lang); setLang('ar')}}>عربى
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="col-3 col-sm-3 col-md-3 col-lg-4 pl-0">
                  <p class="lead" />
                  <ul class="footer-content-left-last">
                    <li style={cursor}>
                      <a  class="small"onClick={()=>{console.log(lang); setLang('indo')}}>Indonesia
                      </a>
                    </li>
                    <li style={cursor}>
                      <a  class="small" onClick={()=>{console.log(lang); setLang('tr')}}>Türk
                      </a>
                    </li>
                    <li style={cursor}>
                      <a  class="small" onClick={()=>{console.log(lang); setLang('fr')}} >Francais
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-12 col-sm-12">
            <div class="footer-content-right">
              <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12">
                  <div class="d-flex justify-content-between logo-social">
                    <img src={logo} alt="Islam Check" style={{width:128}} />
                    <ul class="social-icons d-flex">
                      <li>
                        <a href="">
                          <i class="fab fa-facebook-square" />
                        </a>
                      </li>
                      <li>
                        <a href="">
                          <i class="fab fa-twitter" />
                        </a>
                      </li>
                      <li>
                        <a href="">
                          <i class="fab fa-instagram" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12 col-md-12 col-lg-12 pt-3">
                <p class="footer-text">
                <FormattedMessage id="Footertext"/>
                </p>
                <p class="footer-text">
                  &copy; <FormattedMessage id="FootCopy"/>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
