import React,{useContext} from "react";
import {SurahContext} from "./Store"


function App() {
    
    const[SurahNo,setSurah]=useContext(SurahContext);
    setSurah(window.location.pathname.substring(window.location.pathname.indexOf("/")+1,window.location.pathname.length));
    
    return (
<>

</>
    );
  }
  
  export default App;