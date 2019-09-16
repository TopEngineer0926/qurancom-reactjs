import React,{useContext} from "react";
import Tooltip from "react-simple-tooltip";
import "./Settings-Reading.css";
import { If} from 'react-control-statements';
import InfiniteScroll from 'react-infinite-scroll-component';
import {CurrentPageContext,LastPageContext,SurahContext,endFlagContext,TranslitContext,LoadingContext,OffsetContext} from "./index";
import {Link} from "react-router-dom";
import { goToTop } from 'react-scrollable-anchor'
import { FormattedMessage } from "react-intl";

import "./qfonts.css"
// import "./Dynamicfonts.css"

function Reading(props){
    
    const [SurahNo,setSurah]=useContext(SurahContext);
    const [endFlag, setFlag]= useContext(endFlagContext);
    const[Currentpage,setCurrentPage]=useContext(CurrentPageContext);
    const [lastPage,setLast]=useContext(LastPageContext);
    const [TranslitShowing, setTrans]=useContext(TranslitContext);
    const [off, setOff] = useContext(OffsetContext);
    const [Loading,setLoading]=useContext(LoadingContext);

    //Encoder
const Entities = require('html-entities').AllHtmlEntities;


const entities = new Entities();

    var id=SurahNo;
    const changepage=()=>{

        if(Currentpage!==lastPage){
          setCurrentPage(Currentpage+1);
        
        }
    
        if(Currentpage===lastPage){
          console.log("End Reached")
          setFlag(false)
                        }
    }
    
  
return(
    
<main class="readingmain">
<InfiniteScroll
          dataLength={props.data.length}
          next={changepage}
          hasMore={endFlag}
          loader={<div class="wraper_laader">
          <div class="loader"></div>
          </div>}
          scrollThreshold={0.7}  //executes after 100%-pixelamount
        >
   <div class="container mt-5">
        <div class="fb-tw-share d-flex justify-content-end">
            <a href="javascript:void(0);">
                <i class="fab fa-facebook"></i>
            </a>
            <a href="javascript:void(0);">
                <i class="fab fa-twitter"></i>
            </a>
        </div>
    </div>
    <If condition={SurahNo!==1}>
    <div  class="p1" style={{textAlign:"center"}}>  ﭑﭒﭓﭔ </div>
                </If>
    <div class="mainsurah mtb-big mt-0" >
        <div className="container" >
                  <div class="arabic" style={{paddingTop:60}}>
     { Array.isArray(props.data)? props.data.map((mem)=>

    <>
      {Array.isArray? mem.words.map((member)=>
           (TranslitShowing)?
           <>
                  <Tooltip  className="tooltipmaindiv" 
                  content= {
                   (member.transliteration) ? member.transliteration.transliteration.text: 
                     "Verse "+mem.verse_number 
                                }   
                               //  (mem.words.length=== index + 1)?   
                 background= "#000"
                 fontSize="12px"
                 padding={11}
                 fadeEasing="linear"
                
                >
                  <b className={"pointer "+member.class_name} >
                  {entities.decode(member.code_hex)} </b>
                     </Tooltip> 
                     </>
                     : 
                 <>
                  <Tooltip  className="tooltipmaindiv hamza" 
                
                content= {
                    (member.translation)? member.translation.translation.text: 
                    (member.chartype.name==="end")? "Verse "+mem.verse_number : member.chartype.name }    
                    background= "#000"
                    fontSize="12px"
                    padding={11}
                    fadeEasing="linear"
                    // fixed={true}
                >
                  <b className={"pointer "+member.class_name} >
                  {entities.decode(member.code_hex)}</b>
                  </Tooltip> 
                     </>        
               
                   ):  "Loading"}   
                  </> ):  "Loading"}
        
            </div>
        </div>
    </div>
    </InfiniteScroll>
    <div class="container mb-5">
        <div class="next-previous-surah d-flex justify-content-between align-items-center">
        {(SurahNo!==1)?
        <Link to={`/${SurahNo-1}`} onClick={()=>{setSurah(SurahNo-1);setLoading(true);
            setCurrentPage(1);
            setOff(1); 
            setLast(0)}} 
            class="btn btn-outline-primary btn-lg prev_btn_btm"><FormattedMessage id="Previous Surah"/> <i class="fas fa-arrow-left"></i>
            </Link>
        :""}
        
            <Link to={`/${SurahNo}`} onClick={()=>{
              goToTop()
            }}  class="btn btn-outline-primary btn-lg"><FormattedMessage id="BeginningofSurah"/>
            </Link>
              {(SurahNo!==114)?
            <Link to={`/${SurahNo+1}`} onClick={()=>{setSurah(SurahNo+1);
              setLoading(true);
            setCurrentPage(1);
            setOff(1); 
            setLast(0)}} 
            class="btn btn-outline-primary btn-lg next_btn_btm"><FormattedMessage id="NextSurah"/> <i class="fas fa-arrow-right"></i>
            </Link>
              :""}
        </div>
    </div>

    </main>
);
}
export default Reading;