import React, { useContext, useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import {
    SurahContext, OffsetContext, CurrentPageContext, ChosenVerseFlagContext, QueryContext,
    CheckedContext, LoadingContext, URLContext, LastPageContext, ResultPageContext,
    NoResultsContext
} from "./Store";
import ReactHtmlParser from 'react-html-parser';
import SurahNames from "./SurahNames"
import { makeStyles } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#077b85',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(10),
    },
    btnStyle: {
        textDecoration: 'none',
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'Montserrat',
        '&:hover': {
            color: 'grey',
            textDecoration: 'none'
        }
    },
    logoMargin: {
        marginTop: theme.spacing(6)
    },
    searchStyle: {
        width: 382,
        height: 32,
        margin: 10,
        paddingLeft: 10,
        fontSize: 16,
        fontFamily: 'Montserrat',
        backgroundColor: 'white',
        border: 'none'
    },
    footerLeft: {
        width: 461
    },
    footerRight: {
        width: 329
    },
    footerMain: {
        width: 'calc(100% - 329px - 461px)',
        display: 'flex'
    }
}));

function Footer() {
    const classes = useStyles();
    const Surahs = SurahNames;

    const [SurahSuggestions, setSurahSuggestions] = useState(Surahs);

    const [suggestions2, setSuggest2] = useState([]);
    const [Surah, setSurahNo] = useContext(SurahContext);
    const [Showflag, setShowflag] = useState(false);
    const [off, setOff] = useContext(OffsetContext);
    const [Currentpage, setCurrentPage] = useContext(CurrentPageContext);
    const [isChosen, setChosen] = useContext(ChosenVerseFlagContext);
    const [check, setCheck] = useContext(CheckedContext);
    const [pageNo, setPage] = useContext(CurrentPageContext);
    const [Lastpage, setLast] = useContext(LastPageContext);
    const [isLoading, setLoading] = useContext(LoadingContext);
    const [URL, setURL] = useContext(URLContext);
    const [Query, setQuery] = useContext(QueryContext)
    const [Text, setText] = useState("")
    const [ResultPage, setResultPage] = useContext(ResultPageContext);
    const [NoResults, setNoResultsFound] = useContext(NoResultsContext)

    useEffect(() => {
        const fetchData = async () => {
            fetch(` ${URL}suggest?q=${Text}`)
                .then(res => res.json())
                .then(dat => setSuggest2(dat));

        }
        fetchData();
        //return ()=> setText("");

    }, [Text]);

    const onTextChange = (e) => {
        let Temp = [];


        if (e.target.value.length >= 0) {

            var x = e.target.value;
            setText(x);
            const regex = new RegExp(`^${x}`, 'i')


            Temp = Surahs.sort().filter((x) => regex.test(x))



        }
        if (e.target.value.length > 0) {
            setSurahSuggestions(Temp);
        }
        setShowflag(true);
    }
    const handleClickSubmit = (e) => {
        if (Text.length === 0) {
            e.preventDefault()
        }
        setQuery(Text);
        setResultPage(1);
        setTimeout(function () {
            setNoResultsFound(true);
            setShowflag(false)
        }, 3000);
    }
    return (
        <Grid container className={classes.root}>
            <Grid item className={classes.footerLeft}>
            </Grid>
            <Grid item className={classes.footerMain}>
                <Grid container justify="center" direction="column">
                    <Grid item className="row d-flex justify-content-center">

                        <form className="searchbox" >
                            <FormattedMessage id="placeholder" defaultMessage="search">
                                {placeholder => <input className={classes.searchStyle} autoComplete="off" autoCorrect="off" id='search' type="text" placeholder={placeholder} onChange={onTextChange} />}
                            </FormattedMessage>

                            {Showflag &&
                                <ul className="searchsuggestion_ul">
                                    {Text.length > 0 &&
                                        SurahSuggestions.map((item, ind) =>
                                            <li key={ind} className="searchsuggestion_li">
                                                <Link to={`/${item.substring(item.indexOf("-") + 1, item.length)}`}
                                                    onClick={() => {
                                                        setSurahNo(item.substring(item.indexOf("-") + 1, item.length));
                                                        setLoading(true);
                                                        setPage(1)
                                                        setOff(1)
                                                        setLast(0)
                                                    }}>
                                                    {item}
                                                </Link>

                                            </li>

                                        )}

                                    {suggestions2.map((item, ind) =>
                                        <li key={ind} className="searchsuggestion_li">
                                            <Link to={`/${item.chapter_id}`}
                                                onClick={() => {
                                                    setSurahNo(item.chapter_id);
                                                    if (item.translation_id != null) {
                                                        setCheck({ ...check, [item.translation_id]: true })
                                                    }
                                                    setCurrentPage(1 + (Math.trunc(item.verse_number / 10)));
                                                    setOff(item.verse_number % 10);
                                                    setChosen(true);
                                                    setLoading(true);
                                                    setShowflag(false);

                                                }}>
                                                {ReactHtmlParser(item.text.substring(0, 70))}...
                <span>  ({item.ayah})</span>
                                            </Link>
                                        </li>
                                    )}
                                </ul>}
                        </form>
                    </Grid>
                    <Grid item className={classes.logoMargin}>
                        <Grid container justify="center">
                            <Grid item>
                                <img src='/img/footer-logo.png'></img>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item className={classes.footerRight}>
            </Grid>
        </Grid>
    );
}

export default Footer;
