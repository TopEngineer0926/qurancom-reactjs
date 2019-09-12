import React,{useState} from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider } from "./Nightmode/ThemeContext";

export const InfoContext=React.createContext();
export const ReadingContext=React.createContext();
export const LangContext=React.createContext("en");
export const SurahContext=React.createContext();
export const TranslitContext=React.createContext();
export const CurrentPageContext=React.createContext();
export const LastPageContext=React.createContext();
export const endFlagContext=React.createContext();
//export const VersesContext=React.createContext();

//For Verse Dropdown
export const ChosenVerseFlagContext=React.createContext();
export const ChosenVerseAndPageContext=React.createContext();
export const OffsetContext=React.createContext();

export const LoadingContext=React.createContext();


export const CheckedContext=React.createContext();

    
const Index=()=>{
 
    const [lang,setlang]=useState("en");
    const [Show,setShow]=useState(false);
    const [ShowReading,setReading]=useState(false);
    const [SurahNo,setSurahNo]=useState(window.location.href.substring(window.location.href.indexOf("/#/")+3,window.location.href.length));
    
    const [CurrentpageNo, setPage] = useState(1);
    const [LastpageNo, setLast] = useState(1);
    
    const [endFlag, setFlag]= useState(true);
    //Transliteration Flag
    const [Trans, setTrans]=useState(false);
//Verse Dropdown....
    const [isChosen, setChosen] = useState(false);
    const [ChosenVerseAndPage, setPageandOffset]= useState({ Chosenpage: 0,
                                                     offset: 0 });
    const [off,setoff]=useState();

    const [Loading,setLoading]=useState(true);
    const [check, setCheck] = useState(
        { 
        
    }
    );
    
return(
   
    <ThemeProvider>
   
    <ReadingContext.Provider value={[ShowReading,setReading]}>
    <InfoContext.Provider value={[Show,setShow]}>
    <LangContext.Provider value={[lang,setlang]}>
    <SurahContext.Provider value={[SurahNo,setSurahNo]}>
    <TranslitContext.Provider value={[Trans,setTrans]}>
    <CurrentPageContext.Provider value={[CurrentpageNo, setPage]}>
    <LastPageContext.Provider value={[LastpageNo, setLast]}>
    <ChosenVerseFlagContext.Provider value={[isChosen, setChosen]}>
    <endFlagContext.Provider value={[endFlag, setFlag]}>
    <ChosenVerseAndPageContext.Provider value= {[ChosenVerseAndPage, setPageandOffset]}>
    <OffsetContext.Provider value= {[off,setoff]}>
    <LoadingContext.Provider value={[Loading,setLoading]}>
    <CheckedContext.Provider value={[check, setCheck]}>
    <App/>
    </CheckedContext.Provider>
    </LoadingContext.Provider>
    </OffsetContext.Provider>
    </ChosenVerseAndPageContext.Provider>
    </endFlagContext.Provider>
    </ChosenVerseFlagContext.Provider>
    </LastPageContext.Provider>
    </CurrentPageContext.Provider>
    </TranslitContext.Provider>
    </SurahContext.Provider>
    </LangContext.Provider>
    </InfoContext.Provider>
    </ReadingContext.Provider>
    </ThemeProvider>
);
}

ReactDOM.render(<Index/>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
