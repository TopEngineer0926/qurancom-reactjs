import React,{useContext} from 'react';
import Fade from 'react-reveal/Fade';
import {InfoContext,SurahContext} from "./index";
import mak from "./img/makkah.jpg"
import madinah from "./img/madinah.jpg"
import "./Setting-SurahInfopage.css"
import { If} from 'react-control-statements';


function Modal(props){
    const [Status,setStatus]=useContext(InfoContext);
    const [SurahId]=useContext(SurahContext);
    var index=SurahId-1;
      return(
    <>
<If condition={props.ChapData[index].revelation_place==="madinah"}>
<Fade top>
     <div class="container-fluid collapse" id="surahinfo">
            <div class="row">
                <div style={{paddingRight:"0px"}}class="col-3 col-md-3 col-lg-3 col-xl-3 d-flex align-items-center">
                    <img style={{width:"480px", height:"550px"}} src={madinah} alt="Quran"/>
                </div>
                <div class="col-1 col-md-1 col-lg-1 col-xl-1 text-right text-uppercase">
                    <h6>Verses</h6>
                    <p><span class="primarycolor">{props.ChapData[index].verses_count}</span></p>
                    <h6>Pages</h6>
                    <p><span class="primarycolor">{props.ChapData[index].pages[0]} <span class="dullcolor">:
                    </span>{props.ChapData[index].pages[1]} </span></p>
                </div>
                <div style={{backgroundColor:"#F4F4F4"}} class="col-8 col-md-8 col-lg-8 col-xl-8 pb-0">
                    <div style={{maxHeight:"530px",overflowY:"scroll"}}>
                    <a style={{cursor:"pointer"}} onClick={()=>setStatus(!Status)}>
                        <i class="fas fa-times"></i>
                    </a>
                    <div class="container-fluid">
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
     <div class="container-fluid collapse" id="surahinfo">
            <div class="row">
                <div style={{paddingRight:"0px"}}class="col-3 col-md-3 col-lg-3 col-xl-3 d-flex align-items-center">
                    <img style={{width:"480px", height:"550px"}} src={mak} alt="Quran"/>
                </div>
                <div class="col-1 col-md-1 col-lg-1 col-xl-1 text-right text-uppercase">
                    <h6>Verses</h6>
                    <p><span class="primarycolor">{props.ChapData[index].verses_count}</span></p>
                    <h6>Pages</h6>
                    <p><span class="primarycolor">{props.ChapData[index].pages[0]} <span class="dullcolor">:
                    </span>{props.ChapData[index].pages[1]} </span></p>
                </div>
                <div style={{backgroundColor:"#F4F4F4"}} class="col-8 col-md-8 col-lg-8 col-xl-8">
                    <div style={{maxHeight:"500px",overflowY:"scroll"}}>
                    <a style={{cursor:"pointer"}} onClick={()=>setStatus(!Status)}>
                        <i class="fas fa-times"></i>
                    </a>
                    <div class="container-fluid">
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
   </>
);}

export default Modal;
