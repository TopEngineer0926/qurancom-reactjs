import React, {useEffect, useState, useContext} from "react";
import Info from "./Setting-SurahInfopage";
import Reading from "./Settings-Reading.js";
import Body from "./DetailVersesFetcher";
import {
    useParams
  } from "react-router-dom";
  
//----------------
import {
    SurahContext, CurrentPageContext, LastPageContext, endFlagContext,
    OffsetContext, ChosenVerseAndPageContext, ChosenVerseFlagContext, LoadingContext, CheckedContext, ReciterContext,
    BismillahContext,URLContext,VERSESCONTEXT,TranslationsLoaderContext,InfoContext, ReadingContext,ReciterLoadingContext, LangContext
} from "./Store";


function Main(props) {
    const [Status] = useContext(InfoContext);
    const [ReadStatus] = useContext(ReadingContext);
//------------------------------------------------------------------------
    const [Lang, setLang] = useContext(LangContext);
    const [Verses, setVerses] = useContext(VERSESCONTEXT);
    const [VersesAudio, setVersesAudio] = useState([]);
    const [endFlag, setFlag] = useContext(endFlagContext);
    const [SurahNo] = useContext(SurahContext);
    const [Currentpage, setCurrentPage] = useContext(CurrentPageContext);
    const [lastPage, setLast] = useContext(LastPageContext);
    const [ReciterLoading, setReciterLoading] = useContext(ReciterLoadingContext);
    //Verse Dropdown contexts
    const [OffsetandPage, setPageandOffset] = useContext(ChosenVerseAndPageContext);
    const [isChosen, setChosen] = useContext(ChosenVerseFlagContext);
    const [off, setOff] = useContext(OffsetContext);
    //For Translations...................
    const [Translations, setTranslations] = useState([]);
    //Loading COntext

    const [isLoading, setLoading] = useContext(LoadingContext);
    const [check, setChecked] = useContext(CheckedContext);
    const [ActiveReciter, setActive] = useContext(ReciterContext)
    //----------------------
    const [Bism, setBism] = useContext(BismillahContext);

    const [VersesPack, setVersesPack] = useState([]);

    const [URL,setURL] = useContext(URLContext);
    const [miniLoader,setMiniLoader]= useContext(TranslationsLoaderContext);
    
    var AfterHash=window.location.href.substring(window.location.href.indexOf("/#/") + 3, window.location.href.length);


    useEffect(() => {
        var result = [];
        var TransTemp = [];
        var count = 0;
        setBism(true);
        if (SurahNo == 1 || SurahNo == 9) { 
             
            setBism(false);
        }
        const fetchData = async () => {

        
            if (isChosen || Currentpage === 1) { //|| isChecked
                setFlag(true);//Has More flag setter for Inifinite Scroller...
                setChosen(false); //Flag for Verse Dropdown
                //setCheckedFlag(false)
         


                fetch(`${URL}chapters/${SurahNo}/verses?language=${Lang}&recitation=${ActiveReciter}&page=${Currentpage}&offset=${off}${Object.keys(check).map(function (prop, index) {
                    if (check[prop] === true)
                        return `&translations[]=${prop}`
                }).join('')}`)
                    .then(res => res.json())
                    .then(dat => {


                        setVersesPack(dat.verses);
                        setVerses(dat.verses.data);
                        setVersesAudio(dat.audio_files);
                        setLast(dat.verses.last_page);
                        setLoading(false)
                        setMiniLoader(false)
                        // setReciterLoading(false)
                        
                    });

            }
            else {


                fetch(`${URL}chapters/${SurahNo}/verses?language=${Lang}&recitation=${ActiveReciter}&page=${Currentpage}&offset=${off}${Object.keys(check).map(function (prop, index) {
                    if (check[prop] === true)
                        return `&translations[]=${prop}`
                }).join('')}`)
                    .then(res => res.json())
                    .then(dat => {

                        Array.isArray(Verses) ? result = [...Verses, ...dat.verses.data] :
                            console.log("");
                        setVerses(result);


                        Array.isArray(VersesAudio) ? result = [...VersesAudio, ...dat.audio_files] : console.log("")
                            

                        setVersesAudio(result);
                        setVersesPack(dat.verses);
                        setLoading(false);
                        setMiniLoader(false);
                        // setReciterLoading(false)
                        

                    });

            }

           }
           if(SurahNo!==0)
        {
            fetchData();
        }

    }, [SurahNo, Currentpage, lastPage, off, check, ActiveReciter]);//,check


    
    return (
        <>
          
            {(isLoading ||  AfterHash!= SurahNo) ? <>
                    <div className="wraper_laader">
                        <div className="loader"></div>
                    </div>
                   
                </>
                :
                <>
                  {Status && <Info data={props.info} ChapData={props.ChapData}/>}
                 

                    {(ReadStatus) ? <Reading data={Verses} audio={VersesAudio} versespack={VersesPack}/> :
                        <Body data={Verses} audio={VersesAudio}/>}
                 
                </>

            }
        </>


    );

}

export default Main;