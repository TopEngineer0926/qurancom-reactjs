import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { CheckedContext, URLContext, TranslationsLoaderContext, LangContext } from "./Store"
import { FormattedMessage } from "react-intl";
import Divider from '@material-ui/core/Divider';
import arraySort from "array-sort"
import { async } from 'q';
import { langToTrans } from './maps/languageToTranslatorMap';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Scrollbars } from 'react-custom-scrollbars';

const dropdownStyle = {
  textDecoration: "none",
  fontSize: 17,
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  color: "white",
  backgroundColor: '#c2719f',
  borderRadius: 5
}
const color = {
  color: '#ABABAB'
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NestedList() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [Translators, setTranslators] = useState({ translations: [] });
  const [Reload, setReloadflag] = useState(false);
  const [miniLoader, setMiniLoader] = useContext(TranslationsLoaderContext);

  var arr = []
  //cHECKBOXES
  const [check, setCheck] = useContext(CheckedContext);

  const [URL, setURL] = useContext(URLContext);

  const [lang, setLang] = useContext(LangContext);

  const handleChange = (ID) => event => {

    if (ID !== null) {

      setCheck({ ...check, [ID]: event.target.checked });
      setMiniLoader(true);

    }

  }


  const RemoveAll = () => {

    setCheck({ [langToTrans[lang]]: true });
    setMiniLoader(true);
    setReloadflag(!Reload);


  }


  useEffect(() => {

    setTranlators()

  }, [Reload]);


  const setTranlators = async () => {
    let translators = await sessionStorage.getItem('TranslatorsInSession', JSON.stringify({ translations: [] }));
    translators = JSON.parse(translators);
    console.log(translators);
    const fetchData = async () => {
      fetch(` ${URL}options/translations`)
        .then(res => res.json())
        .then(dat => {
          dat.translations.sort((a, b) => { return a.language_name > b.language_name ? 1 : -1 });
          /* dat.translations.forEach(element => {
             if(element.id != 20) 
             {check[element.id] = false;}              
           });*/
          setCheck(check);
          setTranslators(dat);
        });
    }
    fetchData();
  }


  useEffect(() => {
    // console.log(Translators.translations.length);
    if (Translators.translations.length > 0) { sessionStorage.setItem('TranslatorsInSession', JSON.stringify(Translators)); }
  }, [Translators])

  function handleClick() {
    setOpen(!open);
  }

  return (
    <UncontrolledDropdown>
      <DropdownToggle nav caret style={dropdownStyle}>
        <FormattedMessage id="Translations" />
      </DropdownToggle>
      <DropdownMenu right style={dropdownStyle}>
        <Scrollbars style={{ height: '20vh' }}>
          {(Translators) ? Translators.translations.map((translator, index) =>

            <ListItem key={`Translator_${translator.id}`} button className={classes.nested} >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={check[translator.id]}
                    onChange={handleChange(translator.id)}
                    value={`checked${translator.id}`}
                    disabled={miniLoader}
                  />
                }
                label={translator.language_name + " - " + translator.name}
              />
            </ListItem>

          ) : <div className="wraper_laader">
            <div className="loader loadersmall"></div>
          </div>}
        </Scrollbars>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}

