import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import "./LangDropdown.css";
import { LangContext, CheckedContext } from "./Store";
import { langToTrans } from './maps/languageToTranslatorMap';
import { Scrollbars } from 'react-custom-scrollbars';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme)=>({
    menuItemStyle: {
        height: 33,
        width: 165,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

const dropdownStyle = {
    textDecoration: "none",
    fontSize: 17,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    color: "white",
    backgroundColor: '#37aee3',
    borderRadius: 5,
    '&:hover':{
        backgroundColor: 'rgba(0,0,0,0.08)'
    },
    textTransform: 'uppercase'
}
function Drop() {
    const [lang, setLang] = useContext(LangContext);
    const [check, setCheck] = useContext(CheckedContext);
    const classes = useStyles();
    const langData = [
        {
            langClass: 'de',
            langLabel: 'Deutsch',
            langToTrnas: langToTrans.de
        },
        {
            langClass: 'tr',
            langLabel: 'Türkçe',
            langToTrnas: langToTrans.tr
        },
        {
            langClass: 'ar',
            langLabel: 'عربى',
            langToTrnas: langToTrans.ar
        },
        {
            langClass: 'en',
            langLabel: 'English',
            langToTrnas: langToTrans.en
        },
        {
            langClass: 'bs',
            langLabel: 'Bosanski',
            langToTrnas: langToTrans.bs
        },
        {
            langClass: 'sq',
            langLabel: 'Gjuhë Shqipe',
            langToTrnas: langToTrans.sq
        },
        {
            langClass: 'ur',
            langLabel: `اردو${" "}`,
            langToTrnas: langToTrans.ur
        },
        {
            langClass: 'fa',
            langLabel: `فارسی${" "}`,
            langToTrnas: langToTrans.fa
        },
        {
            langClass: 'ru',
            langLabel: 'Русский',
            langToTrnas: langToTrans.ru
        },
        {
            langClass: 'bg',
            langLabel: 'български',
            langToTrnas: langToTrans.bg
        },
        {
            langClass: 'fr',
            langLabel: 'Français',
            langToTrnas: langToTrans.fr
        },
        {
            langClass: 'nl',
            langLabel: 'Nederlands',
            langToTrnas: langToTrans.nl
        },
        {
            langClass: 'it',
            langLabel: 'Italiano',
            langToTrnas: langToTrans.it
        },
        {
            langClass: 'es',
            langLabel: 'Español',
            langToTrnas: langToTrans.es
        },
        {
            langClass: 'pt',
            langLabel: 'Português',
            langToTrnas: langToTrans.pt
        },
        {
            langClass: 'da',
            langLabel: 'Dansk',
            langToTrnas: langToTrans.da
        },
        {
            langClass: 'sv',
            langLabel: 'Svenska',
            langToTrnas: langToTrans.sv
        },
        {
            langClass: 'no',
            langLabel: 'Norsk',
            langToTrnas: langToTrans.no
        },
        {
            langClass: 'fi',
            langLabel: 'Suomi',
            langToTrnas: langToTrans.fi
        },
        {
            langClass: 'id',
            langLabel: 'Bahasa Indonesia',
            langToTrnas: langToTrans.id
        },
    ];
    return (
        <UncontrolledDropdown>
            <DropdownToggle nav caret style={dropdownStyle} className={classes.menuItemStyle}>
                <FormattedMessage id="Langs"/>
            </DropdownToggle>
            <DropdownMenu right style={dropdownStyle}>
                <Scrollbars style={{ height: '20vh' }}>
                    {
                        langData.map((language, index) => {
                            return (
                                <DropdownItem
                                    key={index}
                                    className={
                                        lang
                                            ? lang === `${language.langClass}`
                                                ? "stripe Selected"
                                                : "stripe"
                                            : "stripe ...."
                                    }
                                    onClick={() => {
                                        setLang(language.langClass);
                                        setCheck({ [language.langToTrans]: true });
                                    }}
                                >
                                    {language.langLabel}
                                </DropdownItem>
                            )
                        })
                    }
                </Scrollbars>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
}
export default Drop;
