import React,{useContext} from "react";
import {SurahContext} from "./Store"


function App() {
    
    const[SurahNo,setSurah]=useContext(SurahContext);
    setSurah(window.location.href.substring(window.location.href.indexOf("/#/")+3,window.location.href.length));
    
    return (
<>

</>
    );
  }
  
  export default App;