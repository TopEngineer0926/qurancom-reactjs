import React, { useState, useContext } from 'react';
import { useTheme } from "./Nightmode/ThemeContext";
import { InfoContext, ReadingContext, ArbicFontSizeContext, TopContext, TransFontChangeContext } from "./Store";
import Reciter from "./Settings-Reciters"
import Translation from "./Settings-Translations"
import Tooltip from "./Settings-Tooltip-Submenu"
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import "./Set.css";
import FontSizeChanger from 'react-font-size-changer';
import { FormattedMessage } from "react-intl";


const useStyles = makeStyles({
    list: {
        width: "350px",


    },
    fullList: {
        width: "auto",

    },
    nested: {
        paddingLeft: "40px",
    },

});
const color = {
    color: '#747474',
    border: 'none'
};

export default function TemporaryDrawer() {
    const [Count, setCount] = useState(0);
    const themeState = useTheme();
    const classes = useStyles();
    const [Showing, setShow] = useContext(InfoContext);
    const [Top, setTop] = useContext(TopContext);

    const [ShowRead, setRead] = useContext(ReadingContext);
    const [ArbicFontSize, setArbicFontSize] = useContext(ArbicFontSizeContext);
    const [TransFontSize, setTransFont] = useContext(TransFontChangeContext);

    const [Drawerstate, setDState] = useState({
        right: false,
    });

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setDState({ ...Drawerstate, [side]: open });
    };

    const sideList = side => (
        <div className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, true)}
            onKeyDown={toggleDrawer(side, false)}

        >


            <List>
                <ListItem button onClick={() => {
                    setCount(Count + 1);
                    setShow(!Showing);

                    if (Showing || Count === 1) {
                        setTop(true)


                    }

                }}>
                    <ListItemIcon style={color}> <i className="fas fa-info-circle"></i>
                    </ListItemIcon>
                    <ListItemText primary={<Typography style={{ color: '#747474', marginLeft: "-20px" }}><FormattedMessage
                        id="SurahInfo" /></Typography>} />
                </ListItem>

                <ListItem button onClick={() => {
                    setRead(!ShowRead);

                }}>
                    <ListItemIcon style={color}> <i className="fas fa-book-open"></i>
                    </ListItemIcon>
                    <ListItemText primary={<Typography style={{ color: '#747474', marginLeft: "-20px" }}><FormattedMessage
                        id="Reading" /></Typography>} />
                </ListItem>

                <ListItem button onClick={() => {
                    themeState.toggle()

                }}>
                    <ListItemIcon style={color}>
                        <i className="fas fa-lightbulb"></i></ListItemIcon>
                    <ListItemText primary={<Typography style={{ color: '#747474', marginLeft: "-20px" }}>{(themeState.dark) ?
                        <FormattedMessage id="Daymode" /> :
                        <FormattedMessage id="Nightmode" />}</Typography>} />
                </ListItem>
            </List>
            <Divider />
            <List>
                <Reciter />
                {(ShowRead) ? "" : <Translation />}
                {/* <Tooltip/> */}
            </List>

            <Divider />
            <List
                subheader={<Typography style={{ color: '#747474', marginLeft: "16px", paddingTop: 20 }}><FormattedMessage
                    id="FontSize" /></Typography>}>
                <div className="sidenavright-lower">
                    <div
                        className="arabic-size arabictxt_size d-flex justify-content-between ml-4 mr-4 align-items-center">
                        {/* Arabic fontsize changer */}
                        <FontSizeChanger
                            targets={['.ArabicFontChange']}
                            onChange={(element, newValue, oldValue) => {

                                setArbicFontSize(newValue)
                            }}
                            options={{
                                stepSize: 2,
                                range: 1000
                            }}
                            className="arabictxt_size"
                            customButtons={{
                                down: <span > <i className="fas fa-minus" style={color}></i> </span>,
                            }}
                        />
                        <h6 style={color}><FormattedMessage id="Arabic" /></h6>
                        <FontSizeChanger
                            targets={['.ArabicFontChange']}
                            onChange={(element, newValue, oldValue) => {
                                if (parseInt(newValue) > 50) return;
                                setArbicFontSize(newValue)
                            }}
                            options={{
                                stepSize: 2,
                                range: 1000
                            }}
                            className="arabictxt_size"
                            customButtons={{
                                up: <span> <i className="fas fa-plus" style={color}></i> </span>,
                            }}
                        />
                    </div>
                    {/* TRANSLATIONS FONT SIZE CHANGER*/}
                    <div
                        className="arabic-size transtxt_size d-flex justify-content-between ml-4 mr-4 align-items-center">
                        <FontSizeChanger
                            targets={['.TranslationFontChanger']}
                            onChange={(element, newValue, oldValue) => {
                                setTransFont(newValue)
                            }}
                            options={{
                                stepSize: 2,
                                range: 1000
                            }}
                            className="transtxt_size"
                            customButtons={{
                                down: <span>
                                    <i className="fas fa-minus" style={color}></i>
                                </span>,
                            }}
                        />
                        <h6 style={color}><FormattedMessage id="Translation" /></h6>
                        <FontSizeChanger
                            targets={['.TranslationFontChanger']}
                            onChange={(element, newValue, oldValue) => {
                                setTransFont(newValue)
                            }}
                            options={{
                                stepSize: 2,
                                range: 1000
                            }}
                            className="transtxt_size"
                            customButtons={{
                                up: <span>
                                    <i className="fas fa-plus" style={color}></i>
                                </span>,
                            }}
                        />
                    </div>
                </div>
            </List>
        </div>
    );


    return (
        <div className="NightM">


            <a className="btn " onClick={toggleDrawer('right', true)}> <span
                className="mobilehidesetting"><FormattedMessage id="Settings" /></span> <i className="fas fa-cog"></i></a>

            <Drawer transitionDuration={800} anchor="right" open={Drawerstate.right}
                onClose={toggleDrawer('right', false)}
            >

                <div style={{ cursor: "pointer" }}
                    className="sidenavright-upper d-flex justify-content-between align-items-center NightM"
                    onClick={toggleDrawer('right', false)}>
                    <h6><FormattedMessage id="Settings" /></h6>
                    <a
                        className="closebtn"
                        id="sideNavTogglerInnerRight"
                    >
                        <i className="fas fa-times"></i>
                    </a>
                </div>
                {sideList('right')}
            </Drawer>

        </div>

    );
}