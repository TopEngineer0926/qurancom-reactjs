import React, {useEffect, useState, useContext} from "react";
import Tooltip from "react-simple-tooltip";
import InfiniteScroll from 'react-infinite-scroll-component';
import {If} from 'react-control-statements';
import {
    SurahContext, CurrentPageContext, LastPageContext, endFlagContext, TranslitContext, ChosenVerseAndPageContext
    , ChosenVerseFlagContext, OffsetContext, LoadingContext
} from "./index";
// import "./Dynamicfonts.css"
import "./qfonts.css"
import {Link} from "react-router-dom";
import {goToTop} from 'react-scrollable-anchor'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Sound from 'react-sound';
import { Modal } from 'react-bootstrap';
import Iframe from 'react-iframe'

import {FacebookShareButton, TwitterShareButton,FacebookIcon} from 'react-share';
import { array } from "prop-types";
// import Modal from "react-responsive-modal";

function Body(props) {
    
    const [Load, setLoading] = useContext(LoadingContext);
    const [offset, setOff] = useContext(OffsetContext);
var arr=[];
    const [endFlag, setFlag] = useContext(endFlagContext);
    const [SurahNo, setSurah] = useContext(SurahContext);
    const [Currentpage, setCurrentPage] = useContext(CurrentPageContext);
    const [lastPage, setLast] = useContext(LastPageContext);
    const [TranslitShowing, setTrans] = useContext(TranslitContext);
    const [OffsetandPage, setPageandOffset] = useContext(ChosenVerseAndPageContext);
    const [isChosen, setChosen] = useContext(ChosenVerseFlagContext);
    const [Translations, setTranslations] = useState([]);
   //FOR MODAL 
    const [ModalStatus,setModal]=useState(false);
    const [MediaArray,setMediaArray]=useState([]);
    const [LittleID,setModalID]=useState();

    const [Mp3File, setMp3File] = useState(['https://s3.us-east-2.amazonaws.com/quran.com/verses/AbdulBaset/Mujawwad/mp3/002001.mp3']);

//Encoder
    const Entities = require('html-entities').AllHtmlEntities;

    const entities = new Entities();
//Media Array being Set
// Array.isArray(props.data)?
// (SurahNo===1)?
// props.data.map((verse)=>
// setMediaArray([...MediaArray,verse.media_contents.url])
// ):console.log("FromMedia Array"):console.log('....')

    useEffect(() => {
        if (isChosen) {

            setCurrentPage(OffsetandPage.Chosenpage);
            setOff(OffsetandPage.offset);
            setLoading(true);
        }


    }, [OffsetandPage]);

    const changepage = () => {

        if (Currentpage !== lastPage) {
            setCurrentPage(Currentpage + 1);

        }

        if (Currentpage === lastPage) {
            console.log("End Reached")
            setFlag(false)
        }
    }


    const playWordAudio = (word) => {
        setMp3File(word.audio_url);
    }
    const handleClick = (ID)=> {
    console.log("handleClick"+ ID)
        setModal(true);
        setModalID(ID);
      }
// Array.isArray(props.data)?
// console.log("Media Array:" + MediaArray):console.log("")
    return (
        <main className="detailmain mt-5">


            <InfiniteScroll
                dataLength={Array.isArray(props.data) ? props.data.length : 0}
                next={changepage}
                hasMore={endFlag}

                loader={<div class="wraper_laader">
                    <div class="loader"></div>
                </div>}
            >
                <div className="container">
                    <div className="ayatboxouter">

                        <Sound
                            url={Mp3File}
                            playStatus={Sound.status.PLAYING}
                            // playFromPosition={300 /* in milliseconds */}
                            // onLoading={this.handleSongLoading}
                            // onPlaying={this.handleSongPlaying}
                            // onFinishedPlaying={this.handleSongFinishedPlaying}
                        />


                        {/*
        <AudioPlayer
                 src={file}
                  autoPlay={true}
                 
                  />    */}

                        <If condition={SurahNo !== 1 && SurahNo !== 9}>
                            <div class="p1 bism" style={{textAlign: "center"}}> ﭑﭒﭓﭔ</div>
                        </If>

                        {Array.isArray(props.data) ? props.data.map((mem,key) =>

                                <div className="row">
                                    <div className="col-3 col-sm-1">

                                        <div className="ayatrefbox">

                                            <div className="ref">
                                                <div
                                                    className="ref-group d-flex justify-content-center align-items-center"
                                                >
                                                    {mem.verse_key}

                                                </div>
                                            </div>
                                            <div className="plycpy">
                                                <div className="plycpy-group text-center">
                                                    <a href="">
                                                        <i className="fas fa-play"></i> Play


                                                    </a>
                                                    <br/>
                                                  
                                                        
                                                                                                               
                                                    <CopyToClipboard text={mem.text_simple}>                                                
                                                        <a href="javaScript:void(0)">
                                                        <i className="fas fa-paperclip"></i> Copy
                                                        </a>
                                                        </CopyToClipboard>
                                                </div>
                                            </div>
                                            <div className="social">
                                          

                                                        <div className="social-group d-flex justify-content-between">
                                                        <FacebookShareButton url="quran.com">
                                            <a href="" className="facustomfacebook">
                                                        <i className="fab fa-facebook-f fa-lg"></i>
                                                    </a>
                                                </FacebookShareButton>
                                                <TwitterShareButton url="quran.com">
                                                    <a href="" className="facustomtwitter">
                                                        <i className="fab fa-twitter fa-lg"></i>
                                                    </a>
                                                    </TwitterShareButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-9 col-sm-11">
                                        <div className="ayatbox">


                                            <h1 className="text-right" dir="rtl">
                                                {mem.words.map((member) =>

                                                    (TranslitShowing) ?
                                                        <>
                                                            <Tooltip className="tooltipmaindiv"
                                                                     content={
                                                                         (member.transliteration) ? member.transliteration.transliteration.text :
                                                                             "Verse " + mem.verse_number
                                                                     }
                                                                //  (mem.words.length=== index + 1)?
                                                                     background="#000"
                                                                     fontSize="12px"
                                                                     padding={11}
                                                                     fadeEasing="linear"

                                                            >
                                                                <b className={"pointer ArabicFontChange" + member.class_name}>

                                                                    {entities.decode(member.code_hex)}  </b>

                                                            </Tooltip>
                                                        </>
                                                        :
                                                        <>
                                                            <Tooltip className="tooltipmaindiv"

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
                                                                   onClick={() => playWordAudio(member)}
                                                                >
                                                                    {entities.decode(member.code_hex)}
                                                                </b>
                                                            </Tooltip>
                                                        </>
                                                )}
                                            </h1>

                                            {/* FETCH TRANSLATIONS */}
                                            {Array.isArray(mem.translations) ? mem.translations.map((trans) =>
                                                    <div className="translation-box TranslationFontChanger">
                                                        <a href=""> {trans.resource_name}</a>
                                                        <p>
                                                            {trans.text}
                                                        </p>
                                                    </div>)
                                                :     <div class="wraper_laader">
                                                <div class="loader loadersmall"></div>
                                              </div>}
                                             
                                              {(SurahNo===1)?
                                              
                                                <a href="javaScript:void(0)" 
                                                className="bayyinah"
                                                
                                                onClick={()=>{handleClick(key)}}>Watch lecture by Bayyinah
                                            {console.log(arr.push(mem.media_contents.url))}
                                                 </a>                                            
                                                :""}
                                                    
                                                    

                                                <Modal centered size="lg" show={ModalStatus} onHide={()=>setModal(false)}>
                                                <Modal.Header closeButton>
                                                <Modal.Title>Bayyinah</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    {(arr[LittleID])?
                                        <Iframe url={arr[LittleID]}
                                                width="100%"
                                                height="450px"
                                                
                                                position="relative"/>:
                                                <div class="wraper_laader">
                                                <div class="loader loadersmall"></div>
                                                </div>
                                                }
                                                </Modal.Body>
                                                <Modal.Footer>
                                                
                                                    </Modal.Footer>
                                               </Modal>

                                        </div>
                                    </div>
                                </div>) :
                            ""}

{console.log("Media:")}
    {console.log(arr)}

                    </div>

                </div>
            </InfiniteScroll>
            <hr/>
            <div class="container mb-5 p-1">
                <div class="next-previous-surah d-flex justify-content-between align-items-center">
                    {(SurahNo !== 1) ?
                        <Link to={`/${SurahNo - 1}`} onClick={() => {
                            setSurah(SurahNo - 1);
                            setLoading(true);
                            setCurrentPage(1);
                            setOff(1);
                            setLast(0)
                        }}
                              class="btn btn-outline-primary btn-lg prev_btn_btm">Previous Surah <i
                            class="fas fa-arrow-left"></i>
                        </Link>
                        : ""}

                    <Link to={`/${SurahNo}`} onClick={() => {
                        goToTop()
                    }} class="btn btn-outline-primary btn-lg">Beginning of Surah
                    </Link>
                    {(SurahNo !== 114) ?
                        <Link to={`/${SurahNo + 1}`} onClick={() => {
                            setSurah(SurahNo + 1);
                            setLoading(true);
                            setCurrentPage(1);
                            setOff(1);
                            setLast(0)
                        }}
                              class="btn btn-outline-primary btn-lg next_btn_btm">Next Surah <i
                            class="fas fa-arrow-right"></i>
                        </Link>
                        : ""}
                </div>
            </div>
        </main>
    );
}

export default Body;
