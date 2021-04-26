import React, { useContext, Suspense, useEffect } from "react";
import { Route, Switch, HashRouter as Router } from "react-router-dom";
import { IntlProvider } from "react-intl";
import styled from "@emotion/styled";
import { LangContext, SurahContext } from "./Store";
import Detail from "./Detailpage";
import Home from "./Homepage";
import messages from "./LocalizationText"
import Notfound from './PageNotFound'
import Results from './Results'
import About from "./AboutUs"
import Contact from "./ContactUs"

const Wrapper = styled("div")`
background: ${props => props.theme.bodybg};
.body {
  color: ${props => props.theme.body};
  background: #161617;
}
.arabic{
  color: ${props => props.theme.body};
  
}
b.pointer {
  color: ${props => props.theme.body};
}
.bism {
  color: ${props => props.theme.body};
}
main.detailmain .ayatboxouter .ayatrefbox {
  background-color: ${props => props.theme.background};
}
main.indexmain .container ul.quicklinks li {
  color: ${props => props.theme.quicklink};
}
main.readingmain {
  background-color: ${props => props.theme.bodybg};
}
.about_desc_text label {
  color: ${props => props.theme.body};
}
.page404 .title{
  color: ${props => props.theme.body};
}
.SearchContent_list h4{
  color: ${props => props.theme.body};
}
.searchcontent_list_main .translation-box P{
  color: ${props => props.theme.body};
}
.bm-menu {
  background:${props => props.theme.sidebarbg};
}
.MuiPaper-root {
  background:black;
}
nav.MuiList-root.MuiList-padding {
  background-color:${props => props.theme.sidebarbg};
}
.sidenavright-upper.NightM{
  background-color:${props => props.theme.sidebarbg};
}
span.translator_name {
  color: ${props => props.theme.transalator};
}
`;

function App() {
  // const Home = React.lazy(() => import('./Homepage'));
  //  const Detail = React.lazy(() => import('./Detailpage'));

  const [lang, setLang] = useContext(LangContext);
  const [SurahNo, setSurah] = useContext(SurahContext);
  var AfterHash = window.location.href.substring(window.location.href.indexOf("/#/") + 3, window.location.href.length);

  useEffect(() => {
    if (SurahNo < 1) {
      setSurah(localStorage.getItem('SurahNo'));
    }

  }, [])

  useEffect(() => {
    localStorage.setItem('SurahNo', SurahNo)
  }, [SurahNo])

  return (
    <Wrapper>

      <IntlProvider locale="en" messages={messages[lang]}>
        <Suspense fallback="Loading....." >
          {(0 < AfterHash && AfterHash < 115) ?
            setSurah(AfterHash) : ""}
          <Router>
            <Switch>

              <Route exact path="/" component={Home} />
              <Route path="/search" component={Results} />
              <Route path="/AboutUs" component={About} />
              <Route path="/ContactUs" component={Contact} />
              <Route path="/Detail/:num" component={Detail} />
              <Route path={`/1`} component={Detail} />



              <Route path={`/2`} component={Detail} />



              <Route path={`/3`} component={Detail} />



              <Route path={`/4`} component={Detail} />



              <Route path={`/5`} component={Detail} />



              <Route path={`/6`} component={Detail} />



              <Route path={`/7`} component={Detail} />



              <Route path={`/8`} component={Detail} />



              <Route path={`/9`} component={Detail} />



              <Route path={`/10`} component={Detail} />



              <Route path={`/11`} component={Detail} />



              <Route path={`/12`} component={Detail} />



              <Route path={`/13`} component={Detail} />



              <Route path={`/14`} component={Detail} />



              <Route path={`/15`} component={Detail} />



              <Route path={`/16`} component={Detail} />



              <Route path={`/17`} component={Detail} />



              <Route path={`/18`} component={Detail} />



              <Route path={`/19`} component={Detail} />



              <Route path={`/20`} component={Detail} />



              <Route path={`/21`} component={Detail} />



              <Route path={`/22`} component={Detail} />



              <Route path={`/23`} component={Detail} />



              <Route path={`/24`} component={Detail} />



              <Route path={`/25`} component={Detail} />



              <Route path={`/26`} component={Detail} />



              <Route path={`/27`} component={Detail} />



              <Route path={`/28`} component={Detail} />



              <Route path={`/29`} component={Detail} />



              <Route path={`/30`} component={Detail} />



              <Route path={`/31`} component={Detail} />



              <Route path={`/32`} component={Detail} />



              <Route path={`/33`} component={Detail} />



              <Route path={`/34`} component={Detail} />



              <Route path={`/35`} component={Detail} />



              <Route path={`/36`} component={Detail} />



              <Route path={`/37`} component={Detail} />



              <Route path={`/38`} component={Detail} />



              <Route path={`/39`} component={Detail} />



              <Route path={`/40`} component={Detail} />



              <Route path={`/41`} component={Detail} />



              <Route path={`/42`} component={Detail} />



              <Route path={`/43`} component={Detail} />



              <Route path={`/44`} component={Detail} />



              <Route path={`/45`} component={Detail} />



              <Route path={`/46`} component={Detail} />



              <Route path={`/47`} component={Detail} />



              <Route path={`/48`} component={Detail} />



              <Route path={`/49`} component={Detail} />



              <Route path={`/50`} component={Detail} />



              <Route path={`/51`} component={Detail} />



              <Route path={`/52`} component={Detail} />



              <Route path={`/53`} component={Detail} />



              <Route path={`/54`} component={Detail} />



              <Route path={`/55`} component={Detail} />



              <Route path={`/56`} component={Detail} />



              <Route path={`/57`} component={Detail} />



              <Route path={`/58`} component={Detail} />



              <Route path={`/59`} component={Detail} />



              <Route path={`/60`} component={Detail} />



              <Route path={`/61`} component={Detail} />



              <Route path={`/62`} component={Detail} />



              <Route path={`/63`} component={Detail} />



              <Route path={`/64`} component={Detail} />



              <Route path={`/65`} component={Detail} />



              <Route path={`/66`} component={Detail} />



              <Route path={`/67`} component={Detail} />



              <Route path={`/68`} component={Detail} />



              <Route path={`/69`} component={Detail} />



              <Route path={`/70`} component={Detail} />



              <Route path={`/71`} component={Detail} />



              <Route path={`/72`} component={Detail} />



              <Route path={`/73`} component={Detail} />



              <Route path={`/74`} component={Detail} />



              <Route path={`/75`} component={Detail} />



              <Route path={`/76`} component={Detail} />



              <Route path={`/77`} component={Detail} />



              <Route path={`/78`} component={Detail} />



              <Route path={`/79`} component={Detail} />



              <Route path={`/80`} component={Detail} />



              <Route path={`/81`} component={Detail} />



              <Route path={`/82`} component={Detail} />



              <Route path={`/83`} component={Detail} />



              <Route path={`/84`} component={Detail} />



              <Route path={`/85`} component={Detail} />



              <Route path={`/86`} component={Detail} />



              <Route path={`/87`} component={Detail} />



              <Route path={`/88`} component={Detail} />



              <Route path={`/89`} component={Detail} />



              <Route path={`/90`} component={Detail} />



              <Route path={`/91`} component={Detail} />



              <Route path={`/92`} component={Detail} />



              <Route path={`/93`} component={Detail} />



              <Route path={`/94`} component={Detail} />



              <Route path={`/95`} component={Detail} />



              <Route path={`/96`} component={Detail} />



              <Route path={`/97`} component={Detail} />



              <Route path={`/98`} component={Detail} />



              <Route path={`/99`} component={Detail} />



              <Route path={`/100`} component={Detail} />



              <Route path={`/101`} component={Detail} />



              <Route path={`/102`} component={Detail} />



              <Route path={`/103`} component={Detail} />



              <Route path={`/104`} component={Detail} />



              <Route path={`/105`} component={Detail} />



              <Route path={`/106`} component={Detail} />



              <Route path={`/107`} component={Detail} />



              <Route path={`/108`} component={Detail} />



              <Route path={`/109`} component={Detail} />



              <Route path={`/110`} component={Detail} />



              <Route path={`/111`} component={Detail} />



              <Route path={`/112`} component={Detail} />



              <Route path={`/113`} component={Detail} />

              <Route path={`/114`} component={Detail} />



              <Route path="/" component={Notfound} />

            </Switch>
          </Router>
        </Suspense>
      </IntlProvider>
    </Wrapper>
  );
}

export default App;