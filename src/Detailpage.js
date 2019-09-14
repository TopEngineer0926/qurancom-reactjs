import React,{useEffect,useState,useContext} from "react";

import Header from "./DetailHeader";
import Footer from "./Footer";
import Main from "./DetailMain";
import {SurahContext,LoadingContext} from "./index";
import { If} from 'react-control-statements';
import { Helmet } from 'react-helmet';

window.isLoading =true;
function Homepage() {
  const [ChapData, setHome]=useState();
  const [Verses, setVerses] = useState();
  const [info,setInfo]=useState();
const [SurahNo, ]=useContext(SurahContext);
const [isLoading, setLoading]=useContext(LoadingContext);
  const id=SurahNo;
 
 

  useEffect(() => {
  
  
   
    const fetchData = async() => {
      fetch('http://104.238.102.6/~yildirim/quran.com/api/api/chapters')
      .then(res =>res.json())
      .then(data=>setHome(data.chapters));
       fetch( `http://104.238.102.6/~yildirim/quran.com/api/api/chapters/${SurahNo}/verses`)
       .then(res =>res.json())
       .then(dat=>setVerses(dat.verses));
        fetch( `http://104.238.102.6/~yildirim/quran.com/api/api/chapters/${SurahNo}/info`)
         .then(res =>res.json())
         .then(dat=>{setInfo(dat.chapter_info);});
    
                }
     fetchData();
              },[SurahNo]);
           
           

  return (
  //   <>
  //     {(isLoading)?
   
  // <div className="loader"></div> :
  <>
 <Helmet>
   <title> Islam Check | {(ChapData)?ChapData[SurahNo-1]["name_simple"]:""}</title>
   </Helmet>


  <Header ChapData={ChapData} VerseTotal={(Verses)? Verses.total:""}/>
  <Main info={info} Content={(Verses)? Verses:""} ChapData={ChapData}/>
<Footer/> 
</> 
// }
  // </>
  
   
  );
}

export default Homepage;
