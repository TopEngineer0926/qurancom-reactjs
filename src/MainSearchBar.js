import React, { useContext, useState, useEffect } from "react";
import Bism from "./img/herobis.png";
import { FormattedMessage } from "react-intl";
import { NavLink, Link } from "react-router-dom";
import { SurahContext, CurrentPageContext, OffsetContext, URLContext, LangContext, LoadingContext, ChapterContext } from "./Store";
import ReactHtmlParser from 'react-html-parser';
import SurahNames from "./SurahNames"
import SurahsItem from "./SurahsItem"
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 132,
    marginTop: 40,
    [theme.breakpoints.down('sm')]: {
      padding: 'unset'
    },
  }
}));
function Main() {
  const classes = useStyles();
  return (
    <main className={classes.root} >
      <section id="surahs">
        <div className="container">
          <div className="tab-content">
            <div className="tab-pane container active" id="all">
              <div className="row">
                <SurahsItem />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
export default Main;
