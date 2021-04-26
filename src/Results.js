import React,{useContext,useEffect,useState} from "react";
import MainBody from "./MainSearchBar";
import Footer from "./Footer";
import Header from "./HomeHeader";
import { Helmet } from 'react-helmet';
import Sound from 'react-sound';
import Tooltip from "react-simple-tooltip";
import Pagination from "react-js-pagination";
import ReactHtmlParser from 'react-html-parser';
import {QueryContext,URLContext,ResultPageContext,NoResultsContext} from "./Store"




 function ResultPage(){
     
 const [Mp3File, setMp3File] = useState(['']);
 const playWordAudio = (word) => {
       setMp3File(word.audio_url + '?_t=' + new Date());
       setPlayWord(1)
    }
    

 const[Query,setQuery]=useContext(QueryContext);
 const[Results, setResults]=useState("");
 const [ResultPage,setPage]=useContext(ResultPageContext);

const[URL,setURL]=useContext(URLContext)
const [NoResults,setNoResultsFound]=useContext(NoResultsContext)
const[loading,setLoader]=useState();
const [playWord, setPlayWord] = useState(0);




 useEffect(() => {  
    const fetchData = async() => {
        
    setLoader(true)
 
            fetch( ` ${URL}search?q=${Query}&p=${ResultPage}`)
            .then(res =>res.json())
            .then(dat=> {setResults(dat)
            setLoader(false)}

                ); 
      }
    fetchData();
    
    
  
    },[ResultPage,Query]);


    //Encoder
    const Entities = require('html-entities').AllHtmlEntities;

    const entities = new Entities();
 return( 

    <> 
    <Helmet>
   <title> Islam Check | Search</title>
   </Helmet>
   <Header/>
       <MainBody />
    
       {(Results)? 
       <div className="search_topbar_pagination">
        <div className="container">
            <div className="row">
                <div className="col-8">
                    <h6 className="m-0"> 
                    
                                    
                    <span className="highlight_text_theme">
                    {Results.current_page}
                    </span> OF {Results.total_pages} FOR SEARCH:  
                    <span className="highlight_text_theme"> {Results.query}</span>
                   </h6>
                </div>
           
                <div className="col-4">

                        <Pagination
                        activePage={Results.current_page}
                        itemsCountPerPage={10}
                        totalItemsCount={Results.total_count}
                        pageRangeDisplayed={5}
                        onChange={(page)=>{setPage(page)}}
                        
                        nextPageText=">"
                        firstPageText="<<"
                        disabledclassName="disabled"
                        lastPageText=">>"
                        prevPageText="<"
                        itemClassFirst="first_pagination_item pagination_li"
                        itemClassPrev="prev_pagination_item pagination_li"
                        itemClassNext="next_pagination_item pagination_li"
                        itemClassLast="last_pagination_item pagination_li"
                        hideDisabled={true}
               
                        />
                       
                </div>
            </div>
        </div>
       </div>
            :""
        }
       
       <div className="SearchContent_list">
           <div className="container">
               <div className="row">
               {(loading)?  <div className="col-12 p-5 text-center">
                        <div className="wraper_laader">
                            <div className="loader"></div>
                        </div>
                   </div>: ""}

                      
               {(Results)?
                        (Results.results.length!==0)?
                    Results.results.map((mem,key) =>
                  (!(loading) && 
                  <div key={`outer${key}`} className="col-12 searchcontent_list_main">
                        <div className="col-1">
                            <div className="verser_box_search">
                                <p className="m-0 ">{mem.verse_key}</p>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="ayatbox">
                                <h1 className="text-right" dir="rtl">
                                    {mem.words.map((member,ind) =>
                                    <>
                                    <Tooltip key={`inner${ind}`} className="tooltipmaindiv"
                                                content={
                                                    (member.translation) ? member.translation.translation.text :
                                                        (member.chartype.name === "end") ? "Verse " + mem.verse_number : member.chartype.name
                                                }
                                                background="#000"
                                                fontSize="12px"
                                                padding={11}
                                                fadeEasing="linear"
                                        // fixed={true}
                                    >
                                    <b className={"pointer ArabicFontChange " + member.class_name} 
                                    onClick={() => playWordAudio(member)}>
                                        {entities.decode(member.code_hex)}
                                    </b>
                                    </Tooltip>
                                    </>
                                    )}
                                </h1>
                                {/* FETCH TRANSLATIONS */}
                                {Array.isArray(mem.translations) ? mem.translations.map((trans,ind) =>
                                    <div key={`inner2${ind}`} className="translation-box TranslationFontChanger">
                                        <span className="translator_name"> {trans.author_name.name}
                                        </span>
                                        <p>
                                        {ReactHtmlParser(trans.text)}
                                        </p>
                                    </div>)
                                    :     
                                    <div className="wraper_laader">
                                        <div className="loader loadersmall"></div>
                                    </div>
                                } 
                            </div>
                        </div>
                   </div>)
                   
                   ):(NoResults)?<h4>No Results Found</h4>: <div className="col-12 p-5 text-center">
                   <div className="wraper_laader">
                       <div className="loader"></div>
                   </div>
              </div>
                   : 
                //    else statement
               
                  (!loading)&& <div className="col-12 p-5 text-center">
                        <div className="wraper_laader">
                            <div className="loader"></div>
                        </div>
                   </div>
                }
               </div>
           </div>
       </div>
       {(Mp3File != '') && (
                <Sound
                    url={(Mp3File) ? Mp3File : ''}
                    playStatus={(playWord === 1) ? Sound.status.PLAYING : Sound.status.STOPPED}
                    onFinishedPlaying = {()=>{ setPlayWord(0)}}
                />
            )}
           <Footer/>
     </>
 );
 }
 export default ResultPage;