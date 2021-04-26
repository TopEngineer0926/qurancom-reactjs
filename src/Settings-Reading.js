import React, {useContext, useState} from "react";
import Tooltip from "react-simple-tooltip";
import "./Settings-Reading.css";
import {If} from 'react-control-statements';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
    CurrentPageContext,
    LastPageContext,
    SurahContext,
    endFlagContext,
    TranslitContext,
    LoadingContext,
    OffsetContext, ArbicFontSizeContext, TopContext, DisabledContext,BismillahContext
} from "./Store";
import {Link} from "react-router-dom";
import {goToTop} from 'react-scrollable-anchor'
import {FormattedMessage} from "react-intl";
import {FacebookShareButton, TwitterShareButton} from 'react-share';
import Sound from 'react-sound';
import {PlayerContextProvider, PlayerContextConsumer} from '@cassette/core';
import {MediaPlayerControls} from '@cassette/player';
import {MediaProgress} from '@cassette/player';
import {RepeatButton} from '@cassette/player';
import {usePlayerContext} from '@cassette/hooks';
import {MuteButton} from '@cassette/player';
import {ForwardSkipButton} from '@cassette/player';
import {PlayPauseButton} from '@cassette/player';
import {DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller} from 'react-scroll'
import "./qfonts.css"
import $ from 'jquery';


function Reading(props) {
    const [Mp3File, setMp3File] = useState(['']);

    const [playWord, setPlayWord] = useState(0);
    const [SurahNo, setSurah] = useContext(SurahContext);
    const [endFlag, setFlag] = useContext(endFlagContext);
    const [Currentpage, setCurrentPage] = useContext(CurrentPageContext);
    const [lastPage, setLast] = useContext(LastPageContext);
    const [TranslitShowing, setTrans] = useContext(TranslitContext);
    const [off, setOff] = useContext(OffsetContext);
    const [Loading, setLoading] = useContext(LoadingContext);
    const [Top, setTop] = useContext(TopContext);
    const [Disabled, setDisabled] = useContext(DisabledContext);
    const [Bism, setBism] = useContext(BismillahContext);

    //Encoder
    const Entities = require('html-entities').AllHtmlEntities;

    const [PlayList, setPlayList] = useState(props.audio);
    const [VersePlay, setVersePlay] = useState(false);
    const [VersesPack, setVersesPack] = useState(props.versespack);

    const [timer, setTimer] = useState('');
    const [currentVerseIndex, setCurrentVerseIndex] = useState(-1);
    const [currentWord, setCurrentWord] = useState(0);
    const [ArbicFontSize, setArbicFontSize] = useContext(ArbicFontSizeContext);

    const entities = new Entities();

    var id = SurahNo;

    const playWordAudio = (word) => {
        setMp3File(word.audio_url + '?_t=' + new Date());
        setPlayWord(1)
    }

    const changepage = () => {

        if (Currentpage !== lastPage) {
            setCurrentPage(Currentpage + 1);
            setTop(false);

        }

        if (Currentpage === lastPage) {
           
            setFlag(false)

        }
    }

    function onFinishedPlayingWord(e) {
        setPlayWord(0)
    }

    function updateTimer(e) {


        setTimer(Math.ceil(e.currentTime * 1000));
        setCurrentVerseIndex(e.trackIndex);


        //console.log('L: ' + $('.highlight-word-on-play').length);
        if ($('.highlight-word-on-play').length) {

            var playingWord = $(".highlight-word-on-play").offset().top;
           
            
 
            if (currentWord > playingWord) {


            }
            else {


               // console.log('cw: ' + currentWord + ': pw: ' + playWord);
                if (currentWord != 0 && currentWord != playingWord) {
                    
                    //console.log('@#@#@##@#@#');
                    scroller.scrollTo('highlighted-word',{
                        duration: 800,
                        delay: 0,
                        smooth: 'easeInOutQuart',
                        offset: -200
                    })
                }
            }


            setCurrentWord(playingWord);

        }

    }


    function activeTrackUpdate(e) {


        if (e.trackIndex == 0)
            scroll.scrollToTop();

    }


    function getSegment(arr, index, childIndex) {

        if (arr[index] != undefined)
            return arr[index][childIndex];

    }

    function GetVerse(props) {
        let words = [];
        let counter = 0;
        props.mem.words.forEach(function myFunction(member, ind) {
            if (member.chartype.name === 'word' || member.chartype.name === 'end') {
                words.push(member)
            }
        });
        return (

            <React.Fragment>


                {words.map(function (member, ind) {
                    return (
                        <Tooltip key={`Rverse_${ind}` } className="tooltipmaindiv hamza"
                                 content={
                                     (member.translation) ? member.translation.translation.text :
                                         (member.chartype.name === "end") ? "Verse " + props.mem.verse_number : member.chartype.name
                                 }
                                 background="#000"
                                 padding={11}
                                 fontSize="12px"
                                 fadeEasing="linear"
                        >


                            <b className={(getSegment(props.mem.audio.segments, ind, 2) < timer) && (getSegment(props.mem.audio.segments, ind, 3) > timer) && currentVerseIndex == props.versekey ? "pointer ArabicFontChange " + member.class_name + " highlight-word-on-play" : "pointer ArabicFontChange " + member.class_name}
                               style={{
                                   'font-size': ArbicFontSize,

                               }}
                               id = {(getSegment(props.mem.audio.segments, ind, 2) < timer) && (getSegment(props.mem.audio.segments, ind, 3) > timer) && currentVerseIndex == props.versekey ?"highlighted-word" : ("word"+ind)}
                            >
                                
                                {entities.decode(member.code_hex)}
                            </b>


                        </Tooltip>

                    )

                })}

            </React.Fragment>
        );


    }

    function setHighLightClass(){
        
    } 


    return (
        <>
            <PlayerContextProvider
                playlist={props.audio}
                onTimeUpdate={(e) => updateTimer(e)}
                onActiveTrackUpdate={(e) => activeTrackUpdate(e)}
                loadFirstTrackOnPlaylistComplete={false}
                defaultRepeatStrategy={'none'}
            >


                <main className="readingmain">
                    <InfiniteScroll
                        dataLength={props.data.length}
                        next={changepage}
                        hasMore={endFlag}
                        loader={<div className="wraper_laader">
                            <div className="loader"></div>
                        </div>}
                        scrollThreshold={0.7}  //executes after 100%-pixelamount
                    >
                        <div className="container mt-5">
                            <div className="fb-tw-share d-flex justify-content-end">
                                <FacebookShareButton url="http://18.189.100.203">
                                    <a href="" className="facustomfacebook">
                                        <i className="fab fa-facebook-f fa-lg"></i>
                                    </a>
                                </FacebookShareButton>
                                <TwitterShareButton url="http://18.189.100.203">
                                    <a href="" className="facustomtwitter">
                                        <i className="fab fa-twitter fa-lg"></i>
                                    </a>
                                </TwitterShareButton>
                            </div>
                        </div>
                      
                        {Bism && <div className={"p1 bism "} style={{textAlign: "center"}}>
                                    ﭑﭒﭓﭔ</div>}
                        <div className="mainsurah mtb-big mt-0">
                            <div className="container">
                                <div className="arabic" style={{paddingTop: 60}}>
                                    {Array.isArray(props.data) ? props.data.map((mem, key) =>

                                        <>

                                            {(currentVerseIndex != key) && (
                                                Array.isArray(mem.words)? mem.words.map((member,ind) =>
                                                    (TranslitShowing) ?
                                                        <>
                                                            <Tooltip key={`Rword_${ind}` } className="tooltipmaindiv"
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
                                                                <b className={"pointer ArabicFontChange " + member.class_name}
                                                                   style={{
                                                                       'fontSize': ArbicFontSize+"px",
                                                                       'lineHeight': ArbicFontSize/50
                                                                   }}
                                                                   onClick={() => playWordAudio(member)}>
                                                                    {entities.decode(member.code_hex)} </b>
                                                            </Tooltip>
                                                        </>
                                                        :
                                                        <>
                                                            <Tooltip className="tooltipmaindiv hamza"

                                                                     content={
                                                                         (member.translation) ? member.translation.translation.text :
                                                                             (member.chartype.name === "end") ? "Verse " + mem.verse_number : member.chartype.name}
                                                                     background="#000"
                                                                     fontSize="12px"
                                                                     padding={11}
                                                                     fadeEasing="linear"
                                                                // fixed={true}
                                                            >
                                                                <b className={"pointer ArabicFontChange " + member.class_name}
                                                                   style={{
                                                                       'fontSize': ArbicFontSize+"px",
                                                                       'lineHeight': ArbicFontSize/50
                                                                   }}
                                                                   onClick={() => playWordAudio(member)}>
                                                                    {entities.decode(member.code_hex)}</b>
                                                            </Tooltip>
                                                        </>
                                                ) : "Loading"
                                            )}


                                            {(currentVerseIndex == key) && (
                                                <GetVerse mem={mem} versekey={key}/>
                                            )}


                                        </>) : "Loading"}

                                </div>


                            </div>
                        </div>
                    </InfiniteScroll>

                    <div className="container mb-5 p-1">
                        <div className="next-previous-surah d-flex justify-content-between align-items-center">
                            {(SurahNo != 1) ?
                                <Link to={`/${SurahNo - 1}`} onClick={() => {
                                    setSurah(SurahNo - 1);
                                    setLoading(true);
                                    setCurrentPage(1);
                                    setOff(1);
                                    setLast(0);
                                    setDisabled(true);
                                    setTimeout(function () {
                                        setDisabled(false);
                                    }, 7000)
                                }}

                                      className={`btn btn-outline-primary btn-lg prev_btn_btm ${(Disabled) ? "disabled" : ""}`}>

                                    <FormattedMessage
                                        id="PreviousSurah"/> <i
                                    className="fas fa-arrow-left"></i>
                                </Link>
                                : ""}

                            <Link to={`/${SurahNo}`} onClick={() => {
                                goToTop()
                            }} className="btn btn-outline-primary btn-lg"><FormattedMessage id="BeginningofSurah"/>
                            </Link>
                            {(SurahNo != 114) ?
                                <Link to={`/${(parseInt(SurahNo) + 1)}`} onClick={() => {
                                    setSurah((parseInt(SurahNo) + 1));
                                    setLoading(true);
                                    setCurrentPage(1);
                                    setOff(1);
                                    setLast(0);
                                    setDisabled(true);
                                    setTimeout(function () {
                                        setDisabled(false);

                                    }, 7000)

                                }}
                                      className={`btn btn-outline-primary btn-lg next_btn_btm
                            ${(Disabled) ? "disabled" : ""}`}>
                                    <FormattedMessage id="NextSurah"/>
                                    <i className="fas fa-arrow-right"></i>
                                </Link>
                                : ""}
                        </div>
                    </div>

                </main>

                <MediaPlayerControls
                    controls={['spacer', 'backskip', 'playpause', 'forwardskip', 'spacer', 'progress', 'repeat']}
                />

            </PlayerContextProvider>

            {(Mp3File != '') && (
                <Sound
                    url={(Mp3File) ? Mp3File : ''}
                    playStatus={(playWord == 1) ? Sound.status.PLAYING : Sound.status.STOPPED}
                    onFinishedPlaying={(e) => onFinishedPlayingWord(e)}

                />

            )}

        </>
    );

}

export default Reading;