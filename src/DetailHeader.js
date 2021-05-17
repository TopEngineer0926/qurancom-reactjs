import React, {useContext} from "react";
import "./LeftSidemenu.css";
import Languages from "./LangDropdown";
import SurahName from "./DetailHeaderSurahName";
import Verse from "./DetailHeaderVersenNum";
import TranslationSize from './TranslationSize';
import ArabicSize from './ArabicSize';
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
        display: 'flex',
        justifyContent: 'center',
    },
    headerLeft: {
        // width: 461,

        display: 'flex',
        [theme.breakpoints.down('lg')]: {
            paddingLeft: 57,
            paddingRight: 78,
        },
        [theme.breakpoints.down('sm')]: {
            padding: 'unset'
        },
    },
    headerMain: {
        // width: 'calc(100% - 461px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelStyle: {
        fontSize: 13.33,
        fontFamily: 'Montserrat'
    },
    headerLogo: {
        [theme.breakpoints.down('sm')]: {
            width: 264
        },
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
        checkedA: themeState.dark ? true : false,
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
            label: <FormattedMessage id="Surahs" />,
            component: <SurahName ChapData={props.ChapData} />
        },
        {
            label: <FormattedMessage id="Verses" />,
            component: <Verse VerseTotal={props.VerseTotal} />
        },
        {
            label: <FormattedMessage id="ArabicSize" />,
            component: <ArabicSize />
        },
        {
            label: <FormattedMessage id="Reciters" />,
            component: <Reciter />
        },
        (!ShowRead) ?
        {
            label: <FormattedMessage id="Translation" />,
            component: (ShowRead) ? "" : <Translation />
        } : {},
        {
            label: <FormattedMessage id="TranslationSize" />,
            component:  <TranslationSize />
        },
        {
            label: <FormattedMessage id="Nightmode" />,
            component: <Switch
                            checked={state.checkedA}
                            onChange={handleChange}
                            name="checkedA"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
        },
        {
            label: <FormattedMessage id="Arabic" />,
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
            <Grid item className={classes.headerLeft} xs={12} sm={12} md={4} lg={3}>
                <Grid container justify="center" direction="column" alignItems="center">
                    <Grid item>
                        <Link to="/">
                            <img src='/img/header-logo.png' className={classes.headerLogo}></img>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item className={classes.headerMain} xs={12} sm={12} md={8} lg={9}>
                <Grid container alignItems="center" style={{marginLeft: 50}}>
                    {
                        data.map((d, i)=>{
                            return (
                                <Grid item key={i} style={{marginRight: 27}}>
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
        </Grid>
    );
}
export default Header;