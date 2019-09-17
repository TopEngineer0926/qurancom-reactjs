import React,{useEffect,useState,useContext}  from "react";
import Info from "./Setting-SurahInfopage";
import {InfoContext} from "./index";
import {ReadingContext} from "./index";
import Reading from "./Settings-Reading.js";
import Body from "./DetailVersesFetcher";
import { If} from 'react-control-statements';
//----------------
import {SurahContext,CurrentPageContext,LastPageContext,endFlagContext,
  OffsetContext,ChosenVerseAndPageContext,ChosenVerseFlagContext,LoadingContext,CheckedContext} from "./index";



  function Main(props){
  const [Status]=useContext(InfoContext);
  const [ReadStatus]=useContext(ReadingContext);
//------------------------------------------------------------------------
  const [Verses, setVerses] = useState();
  const [endFlag, setFlag]= useContext(endFlagContext);
  const [SurahNo]=useContext(SurahContext);
  const[Currentpage,setCurrentPage]=useContext(CurrentPageContext);
  const [lastPage,setLast]=useContext(LastPageContext);

  //Verse Dropdown contexts
  const [OffsetandPage, setPageandOffset] = useContext(ChosenVerseAndPageContext);
  const [isChosen, setChosen] = useContext(ChosenVerseFlagContext);
  const [off, setOff] = useContext(OffsetContext);
  //For Translations...................
  const [Translations, setTranslations]=useState([]);
  //Loading COntext

  const [isLoading, setLoading]=useContext(LoadingContext);
  const [check, setChecked]=useContext(CheckedContext);
  

  useEffect(() => {  
    var result=[];
    var TransTemp=[]; 
    var count=0;
    const fetchData = async() => {

      console.log("Fetch entered...")
         if(isChosen || Currentpage===1){ //|| isChecked
          setFlag(true);//Has More flag setter for Inifinite Scroller...
          setChosen(false); //Flag for Verse Dropdown
          //setCheckedFlag(false)

      
         console.log( Object.keys(check).map(function(key, index){
         if(check[key]===true)
            return (`&translations[]=${key}`)
          
          }).join(''))

             
fetch( `http://104.238.102.6/~yildirim/quran.com/api/api/chapters/${SurahNo}/verses?page=${Currentpage}&offset=${off}${Object.keys(check).map(function(prop, index){
  if(check[prop]===true) 
return `&translations[]=${prop}`
}).join('')}`)
                      .then(res =>res.json())
                      .then(dat=>{
                        setVerses(dat.verses.data);
                                      
                        setLast(dat.verses.last_page); 
                        setLoading(false)
                      });
            
                }
        else{
       

      fetch( `http://104.238.102.6/~yildirim/quran.com/api/api/chapters/${SurahNo}/verses?page=${Currentpage}&offset=${off}${Object.keys(check).map(function(prop, index){
        if(check[prop]===true) 
      return `&translations[]=${prop}`
      }).join('')}`)
            .then(res =>res.json())
            .then(dat=> {
           
              Array.isArray(Verses)?result =[...Verses,...dat.verses.data]:
             alert("Waiting for Verses!");
                setVerses(result);
                setLoading(false);
               
          
                });

            } 
    
      

      }
     fetchData();
  
    },[SurahNo,Currentpage,lastPage,off,check]);


  
  return (
   <> 
   {(isLoading)? <>
    <div class="wraper_laader">
<div class="loader"></div>
</div>
                </> 
     :
        <>  
        {Status && <Info data={props.info} ChapData={props.ChapData}/>}
 
 {(ReadStatus)?<Reading data={Verses}/>: <Body data={Verses} /> }
        {/* <If condition={ReadStatus===true}>
          
              <Reading data={Verses}/>
                            
             </If>
             <If condition={ReadStatus===false}>
           
             <Body data={Verses} />
             </If> */}
          </>
             
            }
      </>
    
  

            );

  }

  export default Main;