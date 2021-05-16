import React, { useContext, useState, useEffect } from "react";
import { SurahContext, CurrentPageContext, OffsetContext, URLContext, LangContext, LoadingContext, ChapterContext } from "./Store";
import { NavLink, Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles((theme) => ({
  boxContainer: {
    margin: '10px',
  },
  leftBox: {
    backgroundColor: '#fff',
    borderTopLeftRadius: '6px',
    borderBottomLeftRadius: '6px',
    border: '1px solid rgba(0, 0, 0, 0.06)',
    borderRight: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  rightBox: {
    backgroundColor: '#fff',
    borderTopRightRadius: '6px',
    borderBottomRightRadius: '6px',
    border: '1px solid rgba(0, 0, 0, 0.06)',
    borderLeft: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  arabicText: {
    fontFamily: 'font1',
    fontSize: '35px',
    fontWeight: 400,
    color: '#000',
    float: 'right',
    marginBottom: 0,
    lineHeight: 1,
  },
}));

function SurahsItem() {
  const classes = useStyles();

  const [Surah, setSurahNo] = useContext(SurahContext);
  const [Makkiflag, ShowMakki] = useState(false);
  const [Madniflag, ShowMadni] = useState(false);
  const [Content, setData] = useContext(ChapterContext);

  const [URL, setURL] = useContext(URLContext);
  const [lang, setLang] = useContext(LangContext);
  const [off, setOff] = useContext(OffsetContext);
  const [Currentpage, setCurrentPage] = useContext(CurrentPageContext);
  const [isLoading, setLoading] = useContext(LoadingContext);

  useEffect(() => {
    const fetchData = async () => {
      fetch(`${URL}chapters?language=${lang}`)
        .then(res => res.json())
        .then(data => setData(data.chapters))
    }
    console.log(Content);
    if (sessionStorage.getItem('PrevLanguage', '') != lang || (Object.entries(Content).length === 0 && Content.constructor === Object)) {
      fetchData();
      sessionStorage.setItem('PrevLanguage', lang)
    }
  }, [lang]);

  var indexs = [];
  for (var i = 0; i < 114; i++) {
    indexs.push(i);
  }

  return (
    <>
      {indexs.map((indix) =>
        <div className="col-lg-4 col-md-6" key={indix} >
          <NavLink to={`/${indix + 1}`} onClick={() => { setSurahNo(indix + 1); setCurrentPage(1); setOff(indix); setLoading(true); }}>
            {/* <div className="surahbox d-flex justify-content-between">
            <div className="surah-content-left">
              <b>{Array.isArray(Content) ? "0" + Content[indix]["id"] : "Loading"}</b>
              <p>
                <span className="lead">{Array.isArray(Content) ? Content[indix]["name_simple"] : "Loading"}</span>
                <br />
                {Array.isArray(Content) ? Content[indix]["translated_name"]["name"] : "Loading"}
              </p>
            </div>
            <div className="surah-content-right">
              <p className="verse-count">{Array.isArray(Content) ? Content[indix]["verses_count"] : ""} Verses</p>
              <p className="arabic-index">{Array.isArray(Content) ? Content[indix]["name_encoded"] : ""}</p>
            </div>
          </div> */}
            <div className={classes.boxContainer}>
              <Grid container>
                <Grid item xs={8} className={classes.leftBox}>
                  <Grid container display="flex" justify="center" alignItems="center">
                    <Grid item xs={12} style={{ borderBottom: '1px solid #eee' }}>
                      <Box display="flex" justifyContent="center" p={1}>
                        <Typography style={{ color: 'black', fontWeight: 'bold', fontSize: 16, textTransform: 'uppercase', fontFamily: 'Montserrat', whiteSpace: 'nowrap' }}>
                          {Array.isArray(Content) ? Content[indix]["name_simple"] : "Loading"}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container display="flex" justify="center" alignItems="center">
                    <Grid item xs={12}>
                      <Box display="flex" justifyContent="center" p={1} pb={0}>
                        <div className={classes.arabicText}>{Array.isArray(Content) ? Content[indix]["name_encoded"] : ""}</div>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item container xs={4} className={classes.rightBox} display="flex" justify="center" alignItems="center" style={{ backgroundColor: '#0c4d83', borderTopRightRadius: '8px', borderBottomRightRadius: '8px' }}>
                  <Grid container display="flex" justify="center" alignItems="center">
                    <Grid item xs={12}>
                      <Box display="flex" justifyContent="center" alignItems="center">
                        <Typography style={{ color: 'white', fontSize: '12px', fontFamily: 'Montserrat' }}>
                          {
                          Array.isArray(Content) ? 
                            <div>
                              <FormattedMessage id="Surahs" />
                              <label>{Content[indix]["id"]}</label>
                            </div>: "Loading"
                          }
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container display="flex" justify="center" alignItems="center">
                    <Grid item xs={12}>
                      <Box display="flex" justifyContent="center" alignItems="center">
                        <Typography style={{ color: 'white', fontSize: '13px', fontFamily: 'Montserrat' }}>
                          {Array.isArray(Content) ? Content[indix]["verses_count"] : ""} <FormattedMessage id="Verses" />
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </NavLink>
        </div>
      )}
    </>
  )
}

export default SurahsItem