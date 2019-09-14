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
}
.arabic{
  color: ${props => props.theme.body};
  
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
 