import React, { useEffect, useState, useContext } from "react";
import Tooltip from "react-simple-tooltip";
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  SurahContext, CurrentPageContext, LastPageContext, endFlagContext, TranslitContext, ChosenVerseAndPageContext
  , ChosenVerseFlagContext, OffsetContext, LoadingContext, BismillahContext, URLContext, ArbicFontSizeContext,
  TranslationsLoaderContext, TopContext, DisabledContext, ReciterLoadingContext, TransFontChangeContext
} from "./Store";
import "./qfonts.css"
import { Link } from "react-router-dom";
import { goToTop } from 'react-scrollable-anchor'
import { FormattedMessage } from "react-intl";
import '@cassette/player/dist/css/cassette-player.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { PlayerContextProvider } from '@cassette/core';
import { MediaPlayerControls } from '@cassette/player';
import { MediaProgress } from '@cassette/player';
import { RepeatButton } from '@cassette/player';
import { usePlayerContext } from '@cassette/hooks';
import { MuteButton } from '@cassette/player';
import { ForwardSkipButton } from '@cassette/player';
import { PlayPauseButton } from '@cassette/player';
import { Modal } from 'react-bootstrap';
import Sound from 'react-sound';
import Iframe from 'react-iframe'
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import ReactHtmlParser from 'react-html-parser';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuList from '@material-ui/core/MenuList';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import TabletAndroidIcon from '@material-ui/icons/TabletAndroid';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: '#167684',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
    color: '#fff',
  },
}))(MenuItem);

const useStyles = makeStyles({
  root: {
    width: 180,
    backgroundColor: '#2691A1',
    borderRadius: '6px'
  },
});

function Body(props) {
  const classes = useStyles();
  const [Bism, setBism] = useContext(BismillahContext);
  const [isLoading, setLoading] = useContext(LoadingContext);
  const [offset, setOff] = useContext(OffsetContext);
  var arr = [];
  const [endFlag, setFlag] = useContext(endFlagContext);
  const [SurahNo, setSurah] = useContext(SurahContext);
  const [Currentpage, setCurrentPage] = useContext(CurrentPageContext);
  const [lastPage, setLast] = useContext(LastPageContext);
  const [TranslitShowing, setTrans] = useContext(TranslitContext);
  const [OffsetandPage, setPageandOffset] = useContext(ChosenVerseAndPageContext);
  const [isChosen, setChosen] = useContext(ChosenVerseFlagContext);
  const [URL, setURL] = useContext(URLContext);
  const [Top, setTop] = useContext(TopContext);
  const [ReciterLoading, setReciterLoading] = useContext(ReciterLoadingContext);
  const [BayyinahIfram, setBayyinah] = useState("");

  const [Mp3File, setMp3File] = useState(['']);
  const [PlayList, setPlayList] = useState(props.audio);
  const [VersePlay, setVersePlay] = useState(false);
  const [timer, setTimer] = useState('');
  const [currentVerseIndex, setCurrentVerseIndex] = useState(-1);
  const [ArbicFontSize, setArbicFontSize] = useContext(ArbicFontSizeContext);
  const [playWord, setPlayWord] = useState(0);

  const [miniLoader, setMiniLoader] = useContext(TranslationsLoaderContext);
  const [TransFontSize, setTransFont] = useContext(TransFontChangeContext);

  //Encoder
  const Entities = require('html-entities').AllHtmlEntities;

  const entities = new Entities();
  //FOR MODAL 
  const [ModalStatus, setModal] = useState(false);
  const [MediaArray, setMediaArray] = useState([]);
  const [LittleID, setModalID] = useState();
  const [Copied, setCopiedState] = useState("");
  const [CopiedButton, setCopiedButton] = useState(false);
  const [CopiedText, setCopiedTextState] = useState("");
  const [CopiedTextButton, setCopiedTextButton] = useState(false);

  //For DIsabling buttons
  const [Disabled, setDisabled] = useContext(DisabledContext);

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
      setTop(false);
    }

    if (Currentpage === lastPage) {
      setFlag(false)
    }
  }

  const handleClick = (ID) => {
    setModal(true);
    setModalID(ID);
  }

  //Function to play word mp3
  //Faisal Mehmood [9-17-2019]
  const playWordAudio = (word) => {
    setMp3File(word.audio_url + '?_t=' + new Date());
    setPlayWord(1)
  }

  function onFinishedPlayingWord(e) {
    setPlayWord(0)
  }

  function PlayerContextUser(props) {
    const {
      activeTrackIndex,
      paused,
      onTogglePause,
      selectTrackIndex,
      onSelectTrackIndex
    } = usePlayerContext([
      'activeTrackIndex',
      'paused',
      'onTogglePause',
      'selectTrackIndex',
      'onSelectTrackIndex'
    ]);

    function playVerse(trackIndex) {
      onSelectTrackIndex(trackIndex);
    }

    return (
      <React.Fragment >
        {(activeTrackIndex == props.trackIndex) && (
          <span>
            {(paused) && (
              <a className="cursor-pointer" onClick={() => onTogglePause()}>
                <span><FormattedMessage id="Play" /></span>
              </a>
            )}
            {(!paused) && (
              <a className="cursor-pointer" onClick={() => onTogglePause()}>                
                <span><FormattedMessage id="Pause" /></span>
              </a>
            )}
          </span>
        )}

        {(activeTrackIndex != props.trackIndex) && (
          <a className="cursor-pointer" onClick={() => playVerse(props.trackIndex)}>
            <FormattedMessage id="Play" />
          </a>
        )}
      </React.Fragment>
    );
  }

  function updateTimer(e) {
    setVersePlay(1);
    setTimer(Math.ceil(e.currentTime * 1000));
    setCurrentVerseIndex(e.trackIndex);
  }

  function activeTrackUpdate(e) {
    if (e.trackIndex === 0 && VersePlay == 1) {
      scroll.scrollToTop();
    }
    else
      scrollTo(e.trackIndex)
  }

  function getSegment(arr, index, childIndex) {
    if (arr[index] != undefined)
      return arr[index][childIndex];
  }

  function GetVerse(props) {
    let words = [];
    props.mem.words.forEach(function myFunction(member, ind) {
      if (member.chartype.name === 'word' || member.chartype.name === 'end') {
        words.push(member)
      }
    });
    return (
      <React.Fragment>
        <h1 className="text-right" dir="rtl">
          {words.map(function (member, ind) {
            return (
              <Tooltip key={`Audio_${ind}`} className="tooltipmaindiv"
                content={
                  (member.translation) ? member.translation.translation.text :
                    (member.chartype.name === "end") ? "Verse " + props.mem.verse_number : member.chartype.name
                }
                background="#000"
                fontSize="12px"
                padding={11}
                fadeEasing="linear">

                <b className={(getSegment(props.mem.audio.segments, ind, 2) < timer) && (getSegment(props.mem.audio.segments, ind, 3) > timer) && currentVerseIndex == props.versekey ? "pointer ArabicFontChange " + member.class_name + " highlight-word-on-play" : "pointer ArabicFontChange " + member.class_name}
                  onClick={() => playWordAudio(member)}
                  style={{ 'fontSize': ArbicFontSize + "px" }}
                >
                  {entities.decode(member.code_hex)}
                </b>
              </Tooltip>
            )
          })}
        </h1>
      </React.Fragment>
    );
  }

  function scrollTo(to) {
    if (to != 0)
      scroller.scrollTo("verse-index" + to, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -200
      })
  }

  function copiedButtonAnim() {
    setCopiedButton(true);
    setTimeout(() => { setCopiedButton(false) }, 2000);
  }

  function copiedTextButtonAnim() {
    setCopiedTextButton(true);
    setTimeout(() => { setCopiedTextButton(false) }, 2000);
  }

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  console.log(props.data, '++++');

  return (
    <div>
      <PlayerContextProvider playlist={props.audio} onTimeUpdate={(e) => updateTimer(e)} onActiveTrackUpdate={(e) => activeTrackUpdate(e)}>
        <main className="detailmain mt-5" style={{ backgroundColor: '#e5e5e5'}}>
          <InfiniteScroll dataLength={Array.isArray(props.data) ? props.data.length : 0} next={changepage} hasMore={(ReciterLoading) ? false : endFlag}
            loader={
              <div className="wraper_laader">
                <div className="loader"></div>
              </div>}
          >
          <div className="container">
            <div className="ayatboxouter">
              {Bism && <div className={"p1 bism "} style={{ textAlign: "center" }}>
                ﭑﭒﭓﭔ</div>}
              {Array.isArray(props.data) ? props.data.map((mem, key) =>
                <div key={`Verse_${key}`}
                  className={currentVerseIndex == key && VersePlay ? 'row playing-verse-container' : 'row'}>
                  <div className="col-2 col-sm-2">
                    <MenuList className={classes.root}>
                      <StyledMenuItem>
                        <ListItemIcon><TabletAndroidIcon fontSize="small" /></ListItemIcon>
                        <Typography variant="inherit">{mem.verse_key}</Typography>
                      </StyledMenuItem>
                      <StyledMenuItem>
                        <ListItemIcon><PlayCircleOutlineIcon fontSize="small" /></ListItemIcon>
                        {/* <ListItemIcon><PauseCircleOutlineIcon fontSize="small" /></ListItemIcon> */}
                        <PlayerContextUser trackIndex={key} />
                      </StyledMenuItem>
                      <StyledMenuItem>
                        <ListItemIcon><FileCopyIcon fontSize="small" /></ListItemIcon>
                        <CopyToClipboard text={`${mem.verse_key} - ${mem.text_madani}`}
                          onCopy={() => { copiedButtonAnim(); setCopiedState(mem.id); }}>
                          <span className='cursor-pointer'>
                            <a className="cursor-pointer" onClick={() => { }}>
                              {(Copied === mem.id && CopiedButton)? <span><FormattedMessage id="Copied" /></span> : <span><FormattedMessage id="Copy Quran" /></span>}
                            </a>
                          </span>
                        </CopyToClipboard>
                      </StyledMenuItem>
                      <StyledMenuItem>
                        <ListItemIcon><FileCopyIcon fontSize="small" /></ListItemIcon>
                        <CopyToClipboard text={`${mem.verse_key} - ${mem.translations[0].text}`}
                          onCopy={() => { copiedTextButtonAnim(); setCopiedTextState(mem.id); }}>
                          <span className='cursor-pointer'>
                            <a className="cursor-pointer" onClick={() => { }}>
                              {(CopiedText === mem.id && CopiedTextButton)? <span><FormattedMessage id="Copied" /></span> : <span><FormattedMessage id="Copy Text" /></span>}
                            </a>
                          </span>
                        </CopyToClipboard>
                      </StyledMenuItem>
                      <StyledMenuItem>
                        <ListItemIcon><FacebookIcon fontSize="small" /></ListItemIcon>
                        <FacebookShareButton url="http://18.189.100.203">Facebook</FacebookShareButton>
                      </StyledMenuItem>
                      <StyledMenuItem>
                        <ListItemIcon><WhatsAppIcon fontSize="small" /></ListItemIcon>
                        <WhatsappShareButton url="http://18.189.100.203">Whatsapp</WhatsappShareButton>
                      </StyledMenuItem>
                    </MenuList>
                    {/* <div className="ayatrefbox">
                      <div className="ref">
                        <div
                          className="ref-group d-flex justify-content-center align-items-center">
                          {mem.verse_key}
                        </div>
                      </div>
                      <div className="plycpy">
                        <div className="plycpy-group text-center">
                          <PlayerContextUser trackIndex={key} />
                          <br />
                          <CopyToClipboard text={`${mem.verse_key} - ${mem.text_madani}`}
                            onCopy={() => { copiedButtonAnim(); setCopiedState(mem.id); }}>
                            <span className='cursor-pointer'>
                              <a className="cursor-pointer" onClick={() => { }}>
                                <i className="fas fa-paperclip"></i>
                                {(Copied === mem.id && CopiedButton)? <span><FormattedMessage id="Copied" /></span> : <span><FormattedMessage id="Copy" /></span>}
                              </a>
                            </span>
                          </CopyToClipboard>
                        </div>
                      </div>
                      <div className="social">
                        <div className="social-group d-flex justify-content-between">
                          <FacebookShareButton url="http://18.189.100.203">
                            <a href="" className="facustomfacebook">
                              <i className="fab fa-facebook-f fa-lg"></i>
                            </a>
                          </FacebookShareButton>
                        </div>
                      </div>
                    </div> */}
                  </div>
                  <div className="col-10 col-sm-10">
                    <div className="ayatbox">
                      <Element name={"verse-index" + key}></Element>
                      {(currentVerseIndex != key) && (
                        <h1 className="text-right" dir="rtl">
                          {mem.words.map((member, ind) =>
                            (TranslitShowing) ?
                              <>
                                <Tooltip key={`Word_${ind}`} className="tooltipmaindiv"
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
                                <b className={"pointer ArabicFontChange " + member.class_name + " " + mem.verse_number}
                                  style={{ 'fontSize': ArbicFontSize + "px" }}
                                  onClick={() => playWordAudio(member)}
                                >
                                  {entities.decode(member.code_hex)}
                                </b>
                                </Tooltip>
                              </>
                              :
                              <>
                                <Tooltip key={`Word_${ind}`} className="tooltipmaindiv"
                                  content={
                                    (member.translation) ? member.translation.translation.text :
                                      (member.chartype.name === "end") ? "Verse " + mem.verse_number : member.chartype.name
                                  }
                                  background="#000"
                                  fontSize="12px"
                                  padding={11}
                                  fadeEasing="linear"
                                >
                                  <b
                                    className={"pointer ArabicFontChange " + member.class_name + " " + mem.verse_number + "test"}
                                    style={{ 'fontSize': ArbicFontSize + "px", 'lineHeight': ArbicFontSize / 30 }}
                                    onClick={() => playWordAudio(member)}
                                  >
                                    {entities.decode(member.code_hex)}
                                  </b>
                                </Tooltip>
                              </>
                          )}
                        </h1>
                      )}
                      {(currentVerseIndex == key && VersePlay) && (
                        <GetVerse mem={mem} versekey={key} />
                      )}
                      {/* FETCH TRANSLATIONS */}
                      {Array.isArray(mem.translations) ? mem.translations.map((trans, i) =>
                        <div key={`Translation_${i}`} className="translation-box TranslationFontChanger">
                          <span className="translator_name" style={{'fontSize': TransFontSize + "px"}}>{trans.resource_name}</span>
                          <p style={{'fontSize': TransFontSize + "px", 'lineHeight': TransFontSize / 10}}>{ReactHtmlParser(trans.text)}</p>
                        </div>)
                        : ''}

                      {/* MINILOADER WHEN TRANSLATIONS CHECKED */}
                      {(miniLoader) ?
                        <div className="wraper_laader">
                          <div className="loader loadersmall"></div>
                        </div> : ""}
                      <Modal className="popupmodal_bayan" centered size="lg" show={ModalStatus}
                        onHide={() => setModal(false)}>
                        <Modal.Header closeButton>
                          <Modal.Title>Bayyinah</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Iframe url={arr[LittleID]}
                            width="100%"
                            height="450px"
                            position="relative"
                            allowFullScreen
                          />
                        </Modal.Body>
                        <Modal.Footer>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </div>
                </div>) :
                ""}
            </div>
          </div>
          </InfiniteScroll>
          <hr />
          {!endFlag && <div className="container mb-5">
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
                    id="PreviousSurah" /> <i
                      className="fas fa-arrow-left"></i>
                </Link>
                : ""}

              <Link to={`/${SurahNo}`} onClick={() => {
                goToTop()
              }} className="btn btn-outline-primary btn-lg"><FormattedMessage id="BeginningofSurah" />
              </Link>
              {(SurahNo != 114) ?
                <Link to={`/${parseInt(SurahNo) + 1}`} onClick={() => {
                  setSurah(parseInt(SurahNo) + 1);
                  setLoading(true);
                  setCurrentPage(1);
                  setOff(1);
                  setLast(0);
                  setDisabled(true);
                  setTimeout(function () {
                    setDisabled(false);
                  }, 7000)
                }}
                  className={`btn btn-outline-primary btn-lg next_btn_btm ${(Disabled) ? "disabled" : ""}`}>
                  <FormattedMessage id="NextSurah" />
                  <i className="fas fa-arrow-right"></i>
                </Link>
                : ""}
            </div>
          </div>}
        </main>

        {(VersePlay) && (
          <MediaPlayerControls controls={['spacer', 'backskip', 'playpause', 'forwardskip', 'spacer', 'progress', 'repeat']}/>
        )}
      </PlayerContextProvider>

      {(Mp3File != '') && (
        <Sound
          url={(Mp3File) ? Mp3File : ''}
          playStatus={(playWord == 1) ? Sound.status.PLAYING : Sound.status.STOPPED}
          onFinishedPlaying={(e) => onFinishedPlayingWord(e)}
        />
      )}
    </div>
  );
}

export default Body;
