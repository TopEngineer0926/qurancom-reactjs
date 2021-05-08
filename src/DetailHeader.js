import React, {useContext} from "react";
import "./LeftSidemenu.css";
import Languages from "./LangDropdown";
import SurahName from "./DetailHeaderSurahName";
import Verse from "./DetailHeaderVersenNum";
import ArabicSize from './TranslationSize';
import TranslationSize from './ArabicSize';
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Switch from '@material-ui/core/Switch';
import { useTheme } from "./Nightmode/ThemeContext";
import { ReadingContext, ArbicFontSizeContext,  TransFontChangeContext } from "./Store";
import Translation from "./Settings-Translations";
import Reciter from "./Settings-Reciters";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles((theme) => ({
    root: {
        height: 132,
        boxShadow: '0 3px 20px 1px rgba(0,0,0,0.07)',
        backgroundColor: 'white',
        [theme.breakpoints.down('lg')]: {
            height: 264
        },
        [theme.breakpoints.down('md')]: {
            height: 680
        },
        [theme.breakpoints.down('sm')]: {
            height: 780
        },
    },
    headerLeft: {
        width: 461,
        paddingLeft: 57,
        paddingRight: 78,
        display: 'flex'
    },
    headerRight: {
        width: 329
    },
    headerMain: {
        width: 'calc(100% - 329px - 461px)',
        display: 'flex'
    },
    labelStyle: {
        fontSize: 13.33,
        fontFamily: 'Montserrat'
    }
}));
const Head = {
    height: "70px"
};
const imgStyle = {
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: "60px",
    width: "156px"
};

function Header(props) {
    const classes = useStyles();
    const themeState = useTheme();
    const [ShowRead, setRead] = useContext(ReadingContext);
    const [ArbicFontSize, setArbicFontSize] = useContext(ArbicFontSizeContext);
    const [TransFontSize, setTransFont] = useContext(TransFontChangeContext);
    const [state, setState] = React.useState({
        checkedA: themeState.dark ? false : true,
        checkedB: ShowRead ? true : false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        if (event.target.name == 'checkedA') {
            themeState.toggle();
        } else if (event.target.name == 'checkedB') {
            setRead(!ShowRead);
        }
    };
    const data = [
        {
            label: 'lang',
            component: <Languages />
        },
        {
            label: 'Sura',
            component: <SurahName ChapData={props.ChapData} />
        },
        {
            label: 'Verse',
            component: <Verse VerseTotal={props.VerseTotal} />
        },
        {
            label: 'Arabic size',
            component: <ArabicSize />
        },
        {
            label: 'Reciter',
            component: <Reciter />
        },
        (!ShowRead) ?
        {
            label: <FormattedMessage id="Translation" />,
            component: (ShowRead) ? "" : <Translation />
        } : {},
        {
            label: 'Translation size',
            component:  <TranslationSize />
        },
        {
            label: themeState.dark ? 'Night mode' : 'Day mode',
            component: <Switch
                            checked={state.checkedA}
                            onChange={handleChange}
                            name="checkedA"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
        },
        {
            label: 'Arabic only',
            component:  <Switch
                            checked={state.checkedB}
                            onChange={handleChange}
                            name="checkedB"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
        }
    ]
    return (
        <Grid container className={classes.root}>
            <Grid item className={classes.headerLeft}>
                <Grid container justify="center" direction="column">
                    <Grid item>
                        <Link to="/">
                            <img src='/img/header-logo.png'></img>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item className={classes.headerMain}>
                <Grid container alignItems="center" justify="space-around">
                    {
                        data.map((d, i)=>{
                            return (
                                <Grid item key={i}>
                                    <Grid container justify="center" direction="column" alignItems="center">
                                        <Grid item>
                                    <label className={classes.labelStyle} style={{visibility: i==0? 'hidden' : 'visible'}}>{d.label}</label>
                                        </Grid>
                                        <Grid item>
                                            {d.component}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Grid>
            <Grid item className={classes.headerRight}>

            </Grid>
        </Grid>
    );
}
export default Header;