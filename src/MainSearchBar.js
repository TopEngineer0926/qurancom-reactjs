import React,{useContext,useState,useEffect} from "react";
import Bism from "./img/herobis.png";
import { FormattedMessage } from "react-intl";
import {Link} from "react-router-dom";
import {SurahContext,OffsetContext,CurrentPageContext,ChosenVerseFlagContext,ChosenVerseAndPageContext, QueryContext,
  CheckedContext,SearchFlagContext,LoadingContext,URLContext,LastPageContext,ResultPageContext,
NoResultsContext
 } from "./Store";
 import ReactHtmlParser from 'react-html-parser';
import SurahNames from "./SurahNames"

function Main() {
 
const Surahs=SurahNames;

const [SurahSuggestions,setSurahSuggestions]= useState(Surahs);

const [suggestions2,setSuggest2] = useState([]);
  const [Surah, setSurahNo]=useContext(SurahContext);
  const [Showflag, setShowflag]=useState(false);
  const [off, setOff] = useContext(OffsetContext);
  const[Currentpage,setCurrentPage]=useContext(CurrentPageContext);
  const [isChosen, setChosen] = useContext(ChosenVerseFlagContext);
  const [OffsetandPage, setPageandOffset] = useContext(ChosenVerseAndPageContext);
  const[check, setCheck]=useContext(CheckedContext);
  const[Qflag,setQflag]=useContext(SearchFlagContext)
  

const[pageNo,setPage]=useContext(CurrentPageContext);
const[Lastpage,setLast]=useContext(LastPageContext);



  const [isLoading, setLoading] = useContext(LoadingContext);
  const [URL, setURL] = useContext(URLContext);
  const[Query,setQuery]=useContext(QueryContext)
  const[Text,setText]=useState("")

  const [ResultPage,setResultPage]=useContext(ResultPageContext);
  const [NoResults,setNoResultsFound]=useContext(NoResultsContext)

  useEffect(() => {  
    const fetchData = async() => {
                                       fetch( ` ${URL}suggest?q=${Text}`)
                                    .then(res =>res.json())
                                    .then(dat=> setSuggest2(dat)); 
          
          }
     fetchData();
     //return ()=> setText("");

    },[Text]);
  
 const onTextChange =(e)=>{
  let Temp=[];
 
  
  if(e.target.value.length >= 0){
    
    var x=e.target.value;
    setText(x);
     const regex =new RegExp(`^${x}`,'i')
    
    
     Temp=Surahs.sort().filter((x)=>regex.test(x))

  
     
  }
  if(e.target.value.length > 0){
  setSurahSuggestions(Temp);
  }
  setShowflag(true);
} 



  return (
    <main className="indexmain">
      <div className="container">
        <div className="row d-flex justify-content-center mt-5">
          <img className="responsiveimg" src={Bism} alt="logo" />
        </div>
 
        <div className="row d-flex justify-content-center mt-5 mb-2">

        <form className="searchbox" > 
          <FormattedMessage id="placeholder" defaultMessage="search">
{placeholder => <input autoComplete="off" autoCorrect="off" id='search' type="text" placeholder={placeholder} onChange={onTextChange} />}
</FormattedMessage>
<Link to={`/search?q=${Text}`} onClick={(e)=>{if(Text.length===0){e.preventDefault()} setQuery(Text);setResultPage(1);  setTimeout(function () {
                                        setNoResultsFound(true);setShowflag(false)
                                        
                                    }, 3000)}}>
                                      <button type="submit" className="fa fa-search"></button></Link> 


{Showflag && 
<ul className="searchsuggestion_ul">
    {Text.length>0 &&
      SurahSuggestions.map((item ,ind)=> 
    <li key={ind} className="searchsuggestion_li">
      <Link to={`/${item.substring(item.indexOf("-")+1,item.length)}`} 
      onClick={()=>{
      setSurahNo(item.substring(item.indexOf("-")+1,item.length));
      setLoading(true);
      setPage(1)
      setOff(1) 
      setLast(0) 
     
    }}> 
    {item}
      </Link>
      
    </li>
     
    )}

    {suggestions2.map((item,ind)=>
      <li key={ind} className="searchsuggestion_li">
       <Link to={`/${item.chapter_id}`}
        onClick={()=>
          {setSurahNo(item.chapter_id);
            if(item.translation_id !=null){
            setCheck({...check,[item.translation_id]:true})
          }
          setCurrentPage(1+(Math.trunc(item.verse_number/10)));
          setOff(item.verse_number%10);
          setChosen(true);
          setLoading(true);
          setShowflag(false);
          
          }}> 
        {ReactHtmlParser(item.text.substring(0,70))}...
        <span>  ({item.ayah})</span>
        </Link>
      </li>
    )}
    </ul>}
          </form>
        </div>


        <div className="row d-flex justify-content-center">
          <ul className="quicklinks align-items-center">
            <li className="btn disabled"><FormattedMessage id="Quick"/></li>|
            <li className="btn">
              <Link to="/36" onClick={()=>setSurahNo(36)}><FormattedMessage id="SurahYasin"/></Link> 
              </li>
            <li className="btn">
            <Link to="/55"  onClick={()=>setSurahNo(55)}><FormattedMessage id="SurahArRahman"/></Link> 
            </li>
            <li className="btn">
            <Link to="/67" onClick={()=>setSurahNo(67)} ><FormattedMessage id="SurahAlMulk"/></Link> 
            </li>
            <li className="btn">
      <Link to="/18" onClick={()=>{setSurahNo(18); } } ><FormattedMessage id="SurahAlKahf"/></Link> 
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
export default Main;
