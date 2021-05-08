import React, {useContext} from "react";
import "./LeftSidemenu.css";
import Languages from "./LangDropdown";
import SurahName from "./DetailHeaderSurahName";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
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
    headerMain: {
        width: 'calc(100% - 461px)',
        display: 'flex'
    },
    labelStyle: {
        fontSize: 13.33,
        fontFamily: 'Montserrat'
    }
}));

function Header(props) {
    const classes = useStyles();
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
                <Grid container alignItems="center">
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