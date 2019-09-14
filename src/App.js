import React, {useContext} from "react";
import Detail from "./Detailpage";
import styled from "@emotion/styled";
import {LangContext} from "./index";
import { Route, HashRouter as Router,Switch } from "react-router-dom";
import {IntlProvider} from "react-intl";
import Home from "./Homepage";
import { Suspense } from 'react';
import messages from "./LocalizationText"
const Wrapper = styled("div")`
background: ${props => props.theme.background};
.body {
  color: ${props => props.theme.body};
  background: #161617;
}
.arabic{
  color: ${props => props.theme.body};
  
}
b.pointer {
  color: white;
}
.bism {
  color: white;
}
main.detailmain .ayatboxouter .ayatrefbox {
  background-color: #161617;
}
main.indexmain .container ul.quicklinks li {
  font-size: 12px;
  font-weight: 500;
  color: #ababab;
}
main.readingmain {
  background-color: #161617;
}
`;

  function App() {
    const [lang]=useContext(LangContext);
    return (
    <Wrapper>
     <IntlProvider messages={messages[lang]}>
      <Suspense fallback="Loading....." >
 <Router>
  <Switch>
  <Route path="/" exact component={Home} />
  <Route path="/" component={Detail} />
</Switch>
</Router>
  </Suspense>
      </IntlProvider>
    
      
       </Wrapper>
    );
  }
  
  export default App;
 