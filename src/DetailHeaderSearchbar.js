  import React,{useContext,useState,useEffect} from "react";
  import "./search.css";
  import { FormattedMessage } from "react-intl";
  import {Link} from "react-router-dom";
  import {QueryContext,ChosenVerseFlagContext,
    SearchFlagContext,CheckedContext,OffsetContext,SurahContext,CurrentPageContext,URLContext,LoadingContext,ResultPageContext,NoResultsContext,LangContext} from "./Store"
import SurahNames from "./SurahNames"
import ReactHtmlParser from 'react-html-parser';
import {langToTrans} from './maps/languageToTranslatorMap';

function Search(){
    const Surahs=SurahNames;

const [SurahSuggestions,setSurahSuggestions]= useState(Surahs);

const [suggestions2,setSuggest2] = useState([]);
  const [Surah, setSurahNo]=useContext(SurahContext);
  const [Showflag, setShowflag]=useState(false);
  const [off, setOff] = useContext(OffsetContext);
  const[Currentpage,setCurrentPage]=useContext(CurrentPageContext);
  const [isChosen, setChosen] = useContext(ChosenVerseFlagContext);
  const[check, setCheck]=useContext(CheckedContext);
  const[Qflag,setQflag]=useContext(SearchFlagContext)
  const [URL,SetUrl]=useContext(URLContext)
  const [Loading,setLoading]=useContext(LoadingContext)
  const [ResultPage,setResultPage]=useContext(ResultPageContext);
  const [NoResults,setNoResultsFound]=useContext(NoResultsContext);
  const [lang,setLang] = useContext(LangContext);


  const[Query,setQuery]=useContext(QueryContext)
  const[Text,setText]=useState('')

  useEffect(()=>{
    console.log(lang)
    setCheck({[langToTrans[lang]]:true})

    return(()=>{
      setCheck({[langToTrans[lang]]:true})
    })
  },[])

  useEffect(() => {  
    const fetchData = async() => {
        
            fetch( ` ${URL}suggest?q=${Text}`)
            .then(res =>res.json())
            .then(dat=> {setSuggest2(dat);
            }); 
          
          }
          if(Text.length>0)
         {fetchData();}
    //  return ()=> setText("");
  
    },[Text]);
  
 const onTextChange =(e)=>{
  let Temp=[];
 
  
  if(e.target.value.length >= 0){
 
    var x=e.target.value;
    setText(x);
        const regex =new RegExp(`^${x}`,'i')
   
     Temp=Surahs.sort().filter((x)=>regex.test(x))

  
     
  }
 
  setSurahSuggestions(Temp);
  setShowflag(true)
} 

  
  return(
    <form className="searchbox detailsearchbox"> 
    <FormattedMessage id="placeholder" defaultMessage="search">
{placeholder => <input autoComplete="off" autoCorrect="off" id='search' type="text" placeholder={placeholder} onChange={onTextChange} />}
</FormattedMessage>

<Link to={`/search?q=${Text}`} onClick={(e)=>{if(Text === '') {e.preventDefault();}  setQuery(Text);setResultPage(1);  setTimeout(function () {
                                        setNoResultsFound(true);setShowflag(false)
                                        
                                    }, 3000)}}>
                                      <button type="submit" className="fa fa-search"></button></Link> 


{Showflag && 
            <ul className="searchsuggestion_ul small_searchsuggestion_ul">
            {Text.length > 0 &&
              SurahSuggestions.map((item,ind)=> 
            <li key={ind} className="searchsuggestion_li">
            <Link to={`/${item.substring(item.indexOf("-")+1,item.length)}`} 
            onClick={()=>
            {
            setSurahNo(item.substring(item.indexOf("-")+1,item.length));
            setShowflag(!Showflag)
            setLoading(true);
            }}> 
            {item}
            </Link>

            </li>

            )}

          {suggestions2.map((item,ind)=>
            <li key={ind} className="searchsuggestion_li">
            <Link to={`/${item.chapter_id}`}
              onClick={()=>{
                setSurahNo(item.chapter_id);
                if(item.translation_id !=null){
                setCheck({...check,[item.translation_id]:true})
                }
                setCurrentPage(1+(Math.trunc(item.verse_number/10)));
                setOff(item.verse_number%10);
                setChosen(true);
                setShowflag(false);
                setLoading(true);
               
                
                }}> 
              {ReactHtmlParser(item.text.substring(0,70))}...
              <span>  ({item.ayah})</span>
              </Link>
            </li>
            )}
</ul>}
    </form>
            );
  }
  export default Search;