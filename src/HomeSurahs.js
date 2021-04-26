import React, {useState, useEffect, useContext } from 'react';
import {NavLink,Link} from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { If} from 'react-control-statements';
import {SurahContext,CurrentPageContext,OffsetContext,URLContext,ChosenVerseFlagContext,LoadingContext,ChapterContext} from "./Store";
import { goToTop } from 'react-scrollable-anchor'
import {LangContext} from "./Store";

function Surahs() {
  const [Surah, setSurahNo]=useContext(SurahContext);
  const[Makkiflag, ShowMakki]=useState(false);
  const[Madniflag, ShowMadni]=useState(false);
  const [Content, setData] = useContext(ChapterContext);
 
  const [URL,setURL] = useContext(URLContext);
  const [lang, setLang]=useContext(LangContext);    
  const [off, setOff] = useContext(OffsetContext);
  const[Currentpage,setCurrentPage]=useContext(CurrentPageContext);
  const [isLoading, setLoading]=useContext(LoadingContext);

   var index1=[];
   var index2=[];
   var index3=[];
   var index4=[];
   var index5=[];
   var index6=[];
   var index7=[];

   for(var i=0; i <114; i++){
      if(i<4){
         index1.push(i);
      }
      if(i>=4 && i<9){
         index2.push(i);
      }
      if(i>=9 && i<16){
         index3.push(i);
      }
      if(i>=16 && i<25){
         index4.push(i);
      }
      if(i>=25 && i<36){
         index5.push(i);
      }
      if(i>=36 && i<49){
         index6.push(i);
      }
      if(i>=49 && i<114){
         index7.push(i);
      }
   }
   


   
  useEffect(() => {
   const fetchData = async() => {
      fetch(`${URL}chapters?language=${lang}`)
      .then(res =>res.json())
      .then(data=>setData(data.chapters))
     
               }
    console.log(Content);
    if(sessionStorage.getItem('PrevLanguage','')!=lang || (Object.entries(Content).length === 0 && Content.constructor === Object))           
   {fetchData();
   sessionStorage.setItem('PrevLanguage',lang)}
},[lang]);

  return (

   
    <section id="surahs" className="mt-5">
      <div className="container">
          {/* <span> {JSON.stringify(Content)}</span> */}
         {/* <span>{index1.map((indix)=>Array.isArray(Content)? Content[indix]["id"] : "Loading")}</span> */}
        <ul className="nav align-items-center">
        <li className="nav-item" onClick={()=>{ShowMadni(false); ShowMakki(false)}} style={{cursor:"pointer"}}>
           <a className={`nav-link  ${!Makkiflag && !Madniflag && `active`}`} data-toggle="tab">
           <FormattedMessage id="All"/>
            </a>
          </li>
          |
          <li className="nav-item " onClick={()=>{ShowMakki(true); ShowMadni(false); }} style={{cursor:"pointer"}}>
            <a className={`nav-link  ${Makkiflag && !Madniflag && `active`}`} data-toggle="tab">
            <FormattedMessage id="Makki"/><span className="badge">88</span>
            </a>
          </li>
          |
          
          <li className="nav-item" onClick={()=>{ShowMadni(true); ShowMakki(false)}} style={{cursor:"pointer"}}>
            <a className={`nav-link  ${!Makkiflag && Madniflag && `active`}`} data-toggle="tab">
            <FormattedMessage id="Madni"/> <span className="badge">28</span>
            </a>
          </li>
          
        </ul>
        <hr />
        {/* TAB CONTENT */}
        
      
    
        <div className="tab-content">
          {/* SHOW ALL SURAHS */}
        <If condition={Makkiflag===false  && Madniflag===false}> 
     
          <div className="tab-pane container active" id="all">
    
  
                 <p className="manzil-text">
                <b>    <FormattedMessage id="Manzil"/> 01</b>
              </p>
              <div className="row" >
  {index1.map((indix)=>
              <div className="col-lg-3 col-md-4 col-sm-6" key={indix} >
                <NavLink to={`/${indix+1}`} onClick={()=>{setSurahNo(indix+1);setCurrentPage(1);setOff(0); setLoading(true);}}>
                  <div className="surahbox d-flex justify-content-between">
                    <div className="surah-content-left">
                      <b>{Array.isArray(Content)? "0"+Content[indix]["id"] : "Loading"}</b>
                      <p>
                        <span className="lead">{Array.isArray(Content)? Content[indix]["name_simple"] : "Loading"}</span>
                        <br />
                        {Array.isArray(Content)? Content[indix]["translated_name"]["name"]:"Loading"}
                      </p>
                    </div>
                    <div className="surah-content-right">
                      <p className="verse-count">{Array.isArray(Content)? Content[indix]["verses_count"]:""} Verses</p>
                      <p className="arabic-index">{Array.isArray(Content)? Content[indix]["name_encoded"]:""}</p>
                    </div>
                  </div>
                </NavLink>
              </div>
            )}
            </div>
            {/* <FormattedMessage id="Manzil"/>01 End */}



                <p className="manzil-text">
                <b><FormattedMessage id="Manzil"/> 02</b>
              </p>
              <div className="row" >
  {index2.map((indix)=>
              <div className="col-lg-3 col-md-4 col-sm-6" key={indix}>
                <Link to={`/${indix+1}`} onClick={()=>{setSurahNo(indix+1);setCurrentPage(1);setOff(0); setLoading(true);}}>
                  <div className="surahbox d-flex justify-content-between">
                    <div className="surah-content-left">
                      <b>{Array.isArray(Content)? "0"+Content[indix]["id"] : "Loading"}</b>
                      <p>
                        <span className="lead">{Array.isArray(Content)? Content[indix]["name_simple"] : "Loading"}</span>
                        <br />
                        {Array.isArray(Content)? Content[indix]["translated_name"]["name"]:"Loading"}
                      </p>
                    </div>
                    <div className="surah-content-right">
                      <p className="verse-count">{Array.isArray(Content)? Content[indix]["verses_count"]:""} Verses</p>
                      <p className="arabic-index">{Array.isArray(Content)? Content[indix]["name_encoded"]:""}</p>
                    </div>
                  </div>
                </Link>
              </div>
            )}
            </div>
            {/* <FormattedMessage id="Manzil"/>02 End */}
          
              <p className="manzil-text">
                     <b><FormattedMessage id="Manzil"/> 03</b>
                  </p>
                  <div className="row" >
  {index3.map((indix)=>
              <div className="col-lg-3 col-md-4 col-sm-6" key={indix}>
                  <Link to={`/${indix+1}`} onClick={()=>{setSurahNo(indix+1);setCurrentPage(1);setOff(0); setLoading(true);}}>
                  <div className="surahbox d-flex justify-content-between">
                    <div className="surah-content-left">
                      <b>{Array.isArray(Content)? Content[indix]["id"] : "Loading"}</b>
                      <p>
                        <span className="lead">{Array.isArray(Content)? Content[indix]["name_simple"] : "Loading"}</span>
                        <br />
                        {Array.isArray(Content)? Content[indix]["translated_name"]["name"]:"Loading"}
                      </p>
                    </div>
                    <div className="surah-content-right">
                      <p className="verse-count">{Array.isArray(Content)? Content[indix]["verses_count"]:""} Verses</p>
                      <p className="arabic-index">{Array.isArray(Content)? Content[indix]["name_encoded"]:""}</p>
                    </div>
                  </div>
                </Link>
              </div>
            )}
            </div>
            {/* <FormattedMessage id="Manzil"/>03 End */}
                  <p className="manzil-text">
                     <b><FormattedMessage id="Manzil"/> 04</b>
                  </p>
                  <div className="row" >
  {index4.map((indix)=>
              <div className="col-lg-3 col-md-4 col-sm-6" key={indix}>
                  <Link to={`/${indix+1}`} onClick={()=>{setSurahNo(indix+1);setCurrentPage(1);setOff(0); setLoading(true);}}>
                  <div className="surahbox d-flex justify-content-between">
                    <div className="surah-content-left">
                      <b>{Array.isArray(Content)? Content[indix]["id"] : "Loading"}</b>
                      <p>
                        <span className="lead">{Array.isArray(Content)? Content[indix]["name_simple"] : "Loading"}</span>
                        <br />
                        {Array.isArray(Content)? Content[indix]["translated_name"]["name"]:"Loading"}
                      </p>
                    </div>
                    <div className="surah-content-right">
                      <p className="verse-count">{Array.isArray(Content)? Content[indix]["verses_count"]:""} Verses</p>
                      <p className="arabic-index">{Array.isArray(Content)? Content[indix]["name_encoded"]:""}</p>
                    </div>
                  </div>
                </Link>
              </div>
            )}
            </div>
            {/* <FormattedMessage id="Manzil"/>04 End */}
                  <p className="manzil-text">
                     <b><FormattedMessage id="Manzil"/> 05</b>
                  </p>
                  <div className="row" >
  {index5.map((indix)=>
              <div className="col-lg-3 col-md-4 col-sm-6" key={indix}>
                <Link to={`/${indix+1}`} onClick={()=>{setSurahNo(indix+1);setCurrentPage(1);setOff(0); setLoading(true);}}>
                  <div className="surahbox d-flex justify-content-between">
                    <div className="surah-content-left">
                      <b>{Array.isArray(Content)? Content[indix]["id"] : "Loading"}</b>
                      <p>
                        <span className="lead">{Array.isArray(Content)? Content[indix]["name_simple"] : "Loading"}</span>
                        <br />
                        {Array.isArray(Content)? Content[indix]["translated_name"]["name"]:"Loading"}
                      </p>
                    </div>
                    <div className="surah-content-right">
                      <p className="verse-count">{Array.isArray(Content)? Content[indix]["verses_count"]:""} Verses</p>
                      <p className="arabic-index">{Array.isArray(Content)? Content[indix]["name_encoded"]:""}</p>
                    </div>
                  </div>
                </Link>
              </div>
            )}
            </div>
            {/* <FormattedMessage id="Manzil"/>05 End */}
                  <p className="manzil-text">
                     <b><FormattedMessage id="Manzil"/> 06</b>
                  </p>
                  <div className="row" >
  {index6.map((indix)=>
              <div className="col-lg-3 col-md-4 col-sm-6" key={indix}>
                 <Link to={`/${indix+1}`} onClick={()=>{setSurahNo(indix+1);setCurrentPage(1);setOff(0); setLoading(true);}}>
                  <div className="surahbox d-flex justify-content-between">
                    <div className="surah-content-left">
                      <b>{Array.isArray(Content)? Content[indix]["id"] : "Loading"}</b>
                      <p>
                        <span className="lead">{Array.isArray(Content)? Content[indix]["name_simple"] : "Loading"}</span>
                        <br />
                        {Array.isArray(Content)? Content[indix]["translated_name"]["name"]:"Loading"}
                      </p>
                    </div>
                    <div className="surah-content-right">
                      <p className="verse-count">{Array.isArray(Content)? Content[indix]["verses_count"]:""} Verses</p>
                      <p className="arabic-index">{Array.isArray(Content)? Content[indix]["name_encoded"]:""}</p>
                    </div>
                  </div>
                </Link>
              </div>
            )}
            </div>
            {/* <FormattedMessage id="Manzil"/>06 End */}
            <p className="manzil-text">
                     <b><FormattedMessage id="Manzil"/> 07</b>
                  </p>

            <div className="row" >
  {index7.map((indix)=>
              <div className="col-lg-3 col-md-4 col-sm-6" key={indix}>
                 <Link to={`/${indix+1}`}onClick={()=>{setSurahNo(indix+1);setCurrentPage(1);setOff(0); setLoading(true);}}>
                  <div className="surahbox d-flex justify-content-between">
                    <div className="surah-content-left">
                      <b>{Array.isArray(Content)? Content[indix]["id"] : "Loading"}</b>
                      <p>
                        <span className="lead">{Array.isArray(Content)? Content[indix]["name_simple"] : "Loading"}</span>
                        <br />
                        {Array.isArray(Content)? Content[indix]["translated_name"]["name"]:"Loading"}
                      </p>
                    </div>
                    <div className="surah-content-right">
                      <p className="verse-count">{Array.isArray(Content)? Content[indix]["verses_count"]:""} Verses</p>
                      <p className="arabic-index">{Array.isArray(Content)? Content[indix]["name_encoded"]:""}</p>
                    </div>
                  </div>
                </Link>
              </div>
            )}
            </div>
            {/* <FormattedMessage id="Manzil"/>07 End */}
               
           
          </div>
       </If>

{/* Show Makki SUrahs */}
<If condition={Makkiflag===true}> 

<div className="tab-pane container active" id="all">
    
    
    <p className="manzil-text">
   <b><FormattedMessage id="Manzil"/> 01</b>
 </p>
 <div className="row" >
{index1.map((indix)=>
  
  
  Array.isArray(Content)?
  Content[indix].revelation_place=="makkah"?
     
        <div className="col-lg-3 col-md-4 col-sm-6" key={indix}>

   <Link to={`/${indix+1}`} onClick={()=>setSurahNo(indix+1)}>
     <div className="surahbox d-flex justify-content-between">
       <div className="surah-content-left">
         <b>0{Array.isArray(Content)? Content[indix]["id"] : "Loading"}</b>
         <p>
           <span className="lead">{Array.isArray(Content)? Content[indix]["name_simple"] : "Loading"}</span>
           <br />
           {Array.isArray(Content)? Content[indix]["translated_name"]["name"]:"Loading"}
         </p>
       </div>
       <div className="surah-content-right">
         <p className="verse-count">{Array.isArray(Content)? Content[indix]["verses_count"]:""} Verses</p>
         <p className="arabic-index">{Array.isArray(Content)? Content[indix]["name_encoded"]:""}</p>
       </div>
     </div>
   </Link>
 
 </div>:"":"Loading"

)}
</div>
{/* <FormattedMessage id="Manzil"/>01 End */}



   <p className="manzil-text">
   <b><FormattedMessage id="Manzil"/> 02</b>
 </p>
 <div className="row" >
{index2.map((indix)=>

    Array.isArray(Content)?
    Content[indix].revelation_place=="makkah"?
       
          <div className="col-lg-3 col-md-4 col-sm-6" key={indix}>
   <Link to={`/${indix+1}`} onClick={()=>setSurahNo(indix+1)}>
     <div className="surahbox d-flex justify-content-between">
       <div className="surah-content-left">
         <b>0{Array.isArray(Content)? Content[indix]["id"] : "Loading"}</b>
         <p>
           <span className="lead">{Array.isArray(Content)? Content[indix]["name_simple"] : "Loading"}</span>
           <br />
           {Array.isArray(Content)? Content[indix]["translated_name"]["name"]:"Loading"}
         </p>
       </div>
       <div className="surah-content-right">
         <p className="verse-count">{Array.isArray(Content)? Content[indix]["verses_count"]:""} Verses</p>
         <p className="arabic-index">{Array.isArray(Content)? Content[indix]["name_encoded"]:""}</p>
       </div>
     </div>
   </Link>
   </div>:"":"Loading"

   

)}
</div>
{/* <FormattedMessage id="Manzil"/>02 End */}

 <p className="manzil-text">
        <b><FormattedMessage id="Manzil"/> 03</b>
     </p>
     <div className="row" >
{index3.map((indix)=>
 
   Array.isArray(Content)?
    Content[indix].revelation_place=="makkah"?
    <div className="col-lg-3 col-md-4 col-sm-6" key={indix}>
     <Link to={`/${indix+1}`} onClick={()=>setSurahNo(indix+1)}>
     <div className="surahbox d-flex justify-content-between">
       <div className="surah-content-left">
         <b>{Array.isArray(Content)? Content[indix]["id"] : "Loading"}</b>
         <p>
           <span className="lead">{Array.isArray(Content)? Content[indix]["name_simple"] : "Loading"}</span>
           <br />
           {Array.isArray(Content)? Content[indix]["translated_name"]["name"]:"Loading"}
         </p>
       </div>
       <div className="surah-content-right">
         <p className="verse-count">{Array.isArray(Content)? Content[indix]["verses_count"]:""} Verses</p>
         <p className="arabic-index">{Array.isArray(Content)? Content[indix]["name_encoded"]:""}</p>
       </div>
     </div>
   </Link>
 </div>:"":"Loading"

)}
</div>
{/* <FormattedMessage id="Manzil"/>03 End */}

     <p className="manzil-text">
        <b><FormattedMessage id="Manzil"/> 04</b>
     </p>
     <div className="row" >
{index4.map((indix)=>

    
   Array.isArray(Content)?
    Content[indix].revelation_place=="makkah"?
    <div className="col-lg-3 col-md-4 col-sm-6" key={indix}>
     <Link to={`/${indix+1}`} onClick={()=>setSurahNo(indix+1)}>
     <div className="surahbox d-flex justify-content-between">
       <div className="surah-content-left">
         <b>{Array.isArray(Content)? Content[indix]["id"] : "Loading"}</b>
         <p>
           <span className="lead">{Array.isArray(Content)? Content[indix]["name_simple"] : "Loading"}</span>
           <br />
           {Array.isArray(Content)? Content[indix]["translated_name"]["name"]:"Loading"}
         </p>
       </div>
       <div className="surah-content-right">
         <p className="verse-count">{Array.isArray(Content)? Content[indix]["verses_count"]:""} Verses</p>
         <p className="arabic-index">{Array.isArray(Content)? Content[indix]["name_encoded"]:""}</p>
       </div>
     </div>
   </Link>
    </div>:"":"Loading"
)}
</div>
{/* <FormattedMessage id="Manzil"/>04 End */}
     <p className="manzil-text">
        <b><FormattedMessage id="Manzil"/> 05</b>
     </p>
     <div className="row" >
{index5.map((indix)=>
  Array.isArray(Content)?
    Content[indix].revelation_place=="makkah"?
    <div className="col-lg-3 col-md-4 col-sm-6" key={indix}>
   <Link to={`/${indix+1}`} onClick={()=>setSurahNo(indix+1)}>
     <div className="surahbox d-flex justify-content-between">
       <div className="surah-content-left">
         <b>{Array.isArray(Content)? Content[indix]["id"] : "Loading"}</b>
         <p>
           <span className="lead">{Array.isArray(Content)? Content[indix]["name_simple"] : "Loading"}</span>
           <br />
           {Array.isArray(Content)? Content[indix]["translated_name"]["name"]:"Loading"}
         </p>
       </div>
       <div className="surah-content-right">
         <p className="verse-count">{Array.isArray(Content)? Content[indix]["verses_count"]:""} Verses</p>
         <p className="arabic-index">{Array.isArray(Content)? Content[indix]["name_encoded"]:""}</p>
       </div>
     </div>
   </Link>
 </div>:"":"Loading"
)}
</div>
{/* <FormattedMessage id="Manzil"/>05 End */}
     <p className="manzil-text">
        <b><FormattedMessage id="Manzil"/> 06</b>
     </p>
     <div className="row" >
{index6.map((indix)=>
  Array.isArray(Content)?
  Content[indix].revelation_place=="makkah"?
  <div className="col-lg-3 col-md-4 col-sm-6" key={indix}>
    <Link to={`/${indix+1}`} onClick={()=>setSurahNo(indix+1)}>
     <div className="surahbox d-flex justify-content-between">
       <div className="surah-content-left">
         <b>{Array.isArray(Content)? Content[indix]["id"] : "Loading"}</b>
         <p>
           <span className="lead">{Array.isArray(Content)? Content[indix]["name_simple"] : "Loading"}</span>
           <br />
           {Array.isArray(Content)? Content[indix]["translated_name"]["name"]:"Loading"}
         </p>
       </div>
       <div className="surah-content-right">
         <p className="verse-count">{Array.isArray(Content)? Content[indix]["verses_count"]:""} Verses</p>
         <p className="arabic-index">{Array.isArray(Content)? Content[indix]["name_encoded"]:""}</p>
       </div>
     </div>
   </Link>
   </div>:"":"Loading"
)}
</div>
{/* <FormattedMessage id="Manzil"/>06 End */}
<p className="manzil-text">
        <b><FormattedMessage id="Manzil"/> 07</b>
     </p>

<div className="row" >
{index7.map((indix)=>
  Array.isArray(Content)?
  Content[indix].revelation_place=="makkah"?
  <div className="col-lg-3 col-md-4 col-sm-6" key={indix}>
    <Link to={`/${indix+1}`} onClick={()=>setSurahNo(indix+1)}>
     <div className="surahbox d-flex justify-content-between">
       <div className="surah-content-left">
         <b>{Array.isArray(Content)? Content[indix]["id"] : "Loading"}</b>
         <p>
           <span className="lead">{Array.isArray(Content)? Content[indix]["name_simple"] : "Loading"}</span>
           <br />
           {Array.isArray(Content)? Content[indix]["translated_name"]["name"]:"Loading"}
         </p>
       </div>
       <div className="surah-content-right">
         <p className="verse-count">{Array.isArray(Content)? Content[indix]["verses_count"]:""} Verses</p>
         <p className="arabic-index">{Array.isArray(Content)? Content[indix]["name_encoded"]:""}</p>
       </div>
     </div>
   </Link>
   </div>:"":"Loading"
)}
</div>
{/* <FormattedMessage id="Manzil"/>07 End */}
  

</div>
       </If>
       
       {/* SHOW MADNI SURAHS */}

 <If condition={Madniflag===true}> 

<div className="tab-pane container active" id="all">
    
    
    <p className="manzil-text">
   <b><FormattedMessage id="Manzil"/> 01</b>
 </p>
 <div className="row" >
{index1.map((indix)=>
  
  
  Array.isArray(Content)?
  Content[indix].revelation_place=="madinah"?
     
        <div className="col-lg-3 col-md-4 col-sm-6" key={indix}>

   <Link to={`/${indix+1}`} onClick={()=>setSurahNo(indix+1)}>
     <div className="surahbox d-flex justify-content-between">
       <div className="surah-content-left">
         <b>0{Array.isArray(Content)? Content[indix]["id"] : "Loading"}</b>
         <p>
           <span className="lead">{Array.isArray(Content)? Content[indix]["name_simple"] : "Loading"}</span>
           <br />
           {Array.isArray(Content)? Content[indix]["translated_name"]["name"]:"Loading"}
         </p>
       </div>
       <div className="surah-content-right">
         <p className="verse-count">{Array.isArray(Content)? Content[indix]["verses_count"]:""} Verses</p>
         <p className="arabic-index">{Array.isArray(Content)? Content[indix]["name_encoded"]:""}</p>
       </div>
     </div>
   </Link>
 
 </div>:"":"Loading"

)}
</div>
{/* <FormattedMessage id="Manzil"/>01 End */}



   <p className="manzil-text">
   <b><FormattedMessage id="Manzil"/> 02</b>
 </p>
 <div className="row" >
{index2.map((indix)=>

    Array.isArray(Content)?
    Content[indix].revelation_place=="madinah"?
       
          <div className="col-lg-3 col-md-4 col-sm-6" key={indix}>
   <Link to={`/${indix+1}`} onClick={()=>setSurahNo(indix+1)}>
     <div className="surahbox d-flex justify-content-between">
       <div className="surah-content-left">
         <b>0{Array.isArray(Content)? Content[indix]["id"] : "Loading"}</b>
         <p>
           <span className="lead">{Array.isArray(Content)? Content[indix]["name_simple"] : "Loading"}</span>
           <br />
           {Array.isArray(Content)? Content[indix]["translated_name"]["name"]:"Loading"}
         </p>
       </div>
       <div className="surah-content-right">
         <p className="verse-count">{Array.isArray(Content)? Content[indix]["verses_count"]:""} Verses</p>
         <p className="arabic-index">{Array.isArray(Content)? Content[indix]["name_encoded"]:""}</p>
       </div>
     </div>
   </Link>
   </div>:"":"Loading"

   

)}
</div>
{/* <FormattedMessage id="Manzil"/>02 End */}

 <p className="manzil-text">
        <b><FormattedMessage id="Manzil"/> 03</b>
     </p>
     <div className="row" >
{index3.map((indix)=>
 
   Array.isArray(Content)?
    Content[indix].revelation_place=="madinah"?
    <div className="col-lg-3 col-md-4 col-sm-6" key={indix}>
     <Link to={`/${indix+1}`} onClick={()=>setSurahNo(indix+1)}>
     <div className="surahbox d-flex justify-content-between">
       <div className="surah-content-left">
         <b>{Array.isArray(Content)? Content[indix]["id"] : "Loading"}</b>
         <p>
           <span className="lead">{Array.isArray(Content)? Content[indix]["name_simple"] : "Loading"}</span>
           <br />
           {Array.isArray(Content)? Content[indix]["translated_name"]["name"]:"Loading"}
         </p>
       </div>
       <div className="surah-content-right">
         <p className="verse-count">{Array.isArray(Content)? Content[indix]["verses_count"]:""} Verses</p>
         <p className="arabic-index">{Array.isArray(Content)? Content[indix]["name_encoded"]:""}</p>
       </div>
     </div>
   </Link>
 </div>:"":"Loading"

)}
</div>
{/* <FormattedMessage id="Manzil"/>03 End */}

     <p className="manzil-text">
        <b><FormattedMessage id="Manzil"/> 04</b>
     </p>
     <div className="row" >
{index4.map((indix)=>

    
   Array.isArray(Content)?
    Content[indix].revelation_place=="madinah"?
    <div className="col-lg-3 col-md-4 col-sm-6" key={indix}>
     <Link to={`/${indix+1}`} onClick={()=>setSurahNo(indix+1)}>
     <div className="surahbox d-flex justify-content-between">
       <div className="surah-content-left">
         <b>{Array.isArray(Content)? Content[indix]["id"] : "Loading"}</b>
         <p>
           <span className="lead">{Array.isArray(Content)? Content[indix]["name_simple"] : "Loading"}</span>
           <br />
           {Array.isArray(Content)? Content[indix]["translated_name"]["name"]:"Loading"}
         </p>
       </div>
       <div className="surah-content-right">
         <p className="verse-count">{Array.isArray(Content)? Content[indix]["verses_count"]:""} Verses</p>
         <p className="arabic-index">{Array.isArray(Content)? Content[indix]["name_encoded"]:""}</p>
       </div>
     </div>
   </Link>
    </div>:"":"Loading"
)}
</div>
{/* <FormattedMessage id="Manzil"/>04 End */}
     <p className="manzil-text">
        <b><FormattedMessage id="Manzil"/> 05</b>
     </p>
     <div className="row" >
{index5.map((indix)=>
  Array.isArray(Content)?
    Content[indix].revelation_place=="madinah"?
    <div className="col-lg-3 col-md-4 col-sm-6" key={indix}>
   <Link to={`/${indix+1}`} onClick={()=>setSurahNo(indix+1)}>
     <div className="surahbox d-flex justify-content-between">
       <div className="surah-content-left">
         <b>{Array.isArray(Content)? Content[indix]["id"] : "Loading"}</b>
         <p>
           <span className="lead">{Array.isArray(Content)? Content[indix]["name_simple"] : "Loading"}</span>
           <br />
           {Array.isArray(Content)? Content[indix]["translated_name"]["name"]:"Loading"}
         </p>
       </div>
       <div className="surah-content-right">
         <p className="verse-count">{Array.isArray(Content)? Content[indix]["verses_count"]:""} Verses</p>
         <p className="arabic-index">{Array.isArray(Content)? Content[indix]["name_encoded"]:""}</p>
       </div>
     </div>
   </Link>
 </div>:"":"Loading"
)}
</div>
{/* <FormattedMessage id="Manzil"/>05 End */}
     <p className="manzil-text">
        <b><FormattedMessage id="Manzil"/> 06</b>
     </p>
     <div className="row" >
{index6.map((indix)=>
  Array.isArray(Content)?
  Content[indix].revelation_place=="madinah"?
  <div className="col-lg-3 col-md-4 col-sm-6" key={indix}>
    <Link to={`/${indix+1}`} onClick={()=>setSurahNo(indix+1)}>
     <div className="surahbox d-flex justify-content-between">
       <div className="surah-content-left">
         <b>{Array.isArray(Content)? Content[indix]["id"] : "Loading"}</b>
         <p>
           <span className="lead">{Array.isArray(Content)? Content[indix]["name_simple"] : "Loading"}</span>
           <br />
           {Array.isArray(Content)? Content[indix]["translated_name"]["name"]:"Loading"}
         </p>
       </div>
       <div className="surah-content-right">
         <p className="verse-count">{Array.isArray(Content)? Content[indix]["verses_count"]:""} Verses</p>
         <p className="arabic-index">{Array.isArray(Content)? Content[indix]["name_encoded"]:""}</p>
       </div>
     </div>
   </Link>
   </div>:"":"Loading"
)}
</div>
{/* <FormattedMessage id="Manzil"/>06 End */}
<p className="manzil-text">
        <b><FormattedMessage id="Manzil"/> 07</b>
     </p>

<div className="row" >
{index7.map((indix)=>
  Array.isArray(Content)?
  Content[indix].revelation_place=="madinah"?
  <div className="col-lg-3 col-md-4 col-sm-6" key={indix}>
    <Link to={`/${indix+1}`} onClick={()=>setSurahNo(indix+1)}>
     <div className="surahbox d-flex justify-content-between">
       <div className="surah-content-left">
         <b>{Array.isArray(Content)? Content[indix]["id"] : "Loading"}</b>
         <p>
           <span className="lead">{Array.isArray(Content)? Content[indix]["name_simple"] : "Loading"}</span>
           <br />
           {Array.isArray(Content)? Content[indix]["translated_name"]["name"]:"Loading"}
         </p>
       </div>
       <div className="surah-content-right">
         <p className="verse-count">{Array.isArray(Content)? Content[indix]["verses_count"]:""} Verses</p>
         <p className="arabic-index">{Array.isArray(Content)? Content[indix]["name_encoded"]:""}</p>
       </div>
     </div>
   </Link>
   </div>:"":"Loading"
)}
</div>
{/* <FormattedMessage id="Manzil"/>07 End */}
  

</div>
       </If>

          </div>
        
          <div className="tab-pane container fade" id="makki"></div>
               <div className="tab-pane container fade" id="madni"></div>
         
        </div>
       
      
    </section>
  );
}

export default Surahs;
