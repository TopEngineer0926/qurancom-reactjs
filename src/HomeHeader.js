import React, {useContext} from "react";
import "./LeftSidemenu.css";
import Languages from "./LangDropdown";
import SurahName from "./DetailHeaderSurahName";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { FormattedMessage } from "react-intl";
import { SurahContext } from "./Store";

const useStyles = makeStyles((theme) => ({
    root: {
        height: 132,
        boxShadow: '0 3px 20px 1px rgba(0,0,0,0.07)',
        backgroundColor: 'white',
        [theme.breakpoints.down('lg')]: {
            height: 264
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
    }
}));

function Header(props) {
    const classes = useStyles();
    const [SurahNo, setSurahNo] = useContext(SurahContext);
    setSurahNo(0);
    const data = [
        {
            label: 'lang',
            component: <Languages />
        },
        {
            label: <FormattedMessage id="Surahs" />,
            component: <SurahName ChapData={props.ChapData} />
        }
    ]
    return (
        <Grid container className={classes.root}>
            <Grid item className={classes.headerLeft} xs={12} sm={12} md={4} lg={3}>
                <Grid container justify="center" direction="column" alignItems="center">
                    <Grid item>
                        <Link to="/">
                            <img src='/img/header-logo.png'></img>
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