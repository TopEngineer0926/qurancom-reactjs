import React,{useContext,useEffect} from 'react';
import Fade from 'react-reveal/Fade';

import mak from "./img/makkah.jpg"
import madinah from "./img/madinah.jpg"
import "./Setting-SurahInfopage.css"
import { If} from 'react-control-statements';
import {goToTop} from 'react-scrollable-anchor'

import {InfoContext,SurahContext,TopContext} from "./Store";


function Modal(props){

    const [Status,setStatus]=useContext(InfoContext);
    const [SurahId]=useContext(SurahContext);
    const [Top]=useContext(TopContext);


    if(Top){
      //  goToTop();
    }

    useEffect(()=>{
       if(Status){
           goToTop()
       }
    },[Status])

    var index=SurahId-1;
      return(

   
          (props.ChapData)?
    <>
 
 <If condition={props.ChapData[index].revelation_place==="madinah"}>
<Fade top>
     <div className="container-fluid " id="surahinfo">
            <div className="row">
                <div style={{paddingRight:"0px"}}className="col-md-3 col-lg-3 col-xl-3 d-flex align-items-center surahinfo_img">
                    <img style={{width:"480px", height:"550px"}} src={madinah} alt="Quran"/>
                </div>
                <div className="col-md-1 col-lg-1 col-xl-1 text-right text-uppercase surahinfo_middle_txt">
                    <h6>Verses</h6>
                    <p><span className="primarycolor">{props.ChapData[index].verses_count}</span></p>
                    <h6>Pages</h6>
                    <p><span className="primarycolor">{props.ChapData[index].pages[0]} <span className="dullcolor">:
                    </span>{props.ChapData[index].pages[1]} </span></p>
                </div>
                <div style={{backgroundColor:"#F4F4F4"}} className="col-md-8 col-lg-8 col-xl-8 pb-0 surahinfo_right_txt">
                    <div style={{maxHeight:"530px",overflowY:"scroll"}}>
                    <a style={{cursor:"pointer"}} onClick={()=>setStatus(!Status)}>
                        <i className="fas fa-times"></i>
                    </a>
                    <div className="container-fluid">
                    {props.data.text.map((item)=>
                    <>
                    <h6> {item.h2}</h6> 
                    <p>{item.p}</p></>)
                    }
                        </div>
                </div>
                </div>
            </div>
        </div>
      
   </Fade>
   </If>

<If condition={props.ChapData[index].revelation_place==="makkah"}>
<Fade top>
     <div className="container-fluid " id="surahinfo">
            <div className="row">
                <div style={{paddingRight:"0px"}}className="col-md-3 col-lg-3 col-xl-3 d-flex align-items-center surahinfo_img">
                    <img style={{width:"480px", height:"550px"}} src={mak} alt="Quran"/>
                </div>
                <div className="col-md-1 col-lg-1 col-xl-1 text-right text-uppercase surahinfo_middle_txt">
                    <h6>Verses</h6>
                    <p><span className="primarycolor">{props.ChapData[index].verses_count}</span></p>
                    <h6>Pages</h6>
                    <p><span className="primarycolor">{props.ChapData[index].pages[0]} <span className="dullcolor">:
                    </span>{props.ChapData[index].pages[1]} </span></p>
                </div>
                <div style={{backgroundColor:"#F4F4F4"}} className="col-md-8 col-lg-8 col-xl-8 surahinfo_right_txt">
                    <div style={{maxHeight:"530px",overflowY:"scroll"}}>
                    <a style={{cursor:"pointer"}} onClick={()=>setStatus(!Status)}>
                        <i className="fas fa-times"></i>
                    </a>
                    <div className="container-fluid">
                    {props.data.text.map((item)=>
                    <>
                    <h6> {item.h2}</h6> 
                    <p>{item.p}</p></>)
                    }
                        </div>
                </div>
                </div>
            </div>
        </div>
      
   </Fade>
   </If>
   </>:<div className="wraper_laader">
                        <div className="loader"></div>
                    </div>
);}

export default Modal;
