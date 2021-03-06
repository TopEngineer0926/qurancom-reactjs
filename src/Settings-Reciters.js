import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ReciterContext, URLContext, LoadingContext } from "./Store"
import { FormattedMessage } from "react-intl";
import { async } from 'q';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Scrollbars } from 'react-custom-scrollbars';

const color = {
  color: '#747474'
};
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
    color: 'white',
    '&:hover':{
      backgroundColor: 'rgba(0,0,0,0.08)',
      color: 'white'
    }
  },
}));

const dropdownStyle = {
  textDecoration: "none",
  fontSize: 17,
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  color: "white",
  backgroundColor: '#c2719f',
  borderRadius: 5
}
export default function NestedList() {
  const classes = useStyles();
  const [Reciters, setReciters] = useState({ recitaitons: [] });
  const [ActiveReciter, setActive] = useContext(ReciterContext)
  const [URL, setURL] = useContext(URLContext)

  const [isLoading, setLoading] = useContext(LoadingContext);

  useEffect(() => {
    setRecitersForMenu();

  }, [URL]);

  const setRecitersForMenu = async () => {
    let recitors = await sessionStorage.getItem('RecitersInSession', null);
    recitors = JSON.parse(recitors);
    const fetchData = async () => {

      fetch(` ${URL}options/recitations`)
        .then(res => res.json())
        .then(dat => setReciters(dat));
    }

    if (recitors != null) {
      setReciters(recitors)
    }
    else {
      fetchData();
    }

  }

  useEffect(() => {
    if (Reciters.recitaitons.length > 0) { sessionStorage.setItem('RecitersInSession', JSON.stringify(Reciters)); }
  }, [Reciters])

  const handleChange = (ID) => {

    setActive(ID);
    setLoading(true);
  }

  return (
    <UncontrolledDropdown>
      <DropdownToggle nav caret style={dropdownStyle}>
        <FormattedMessage id="Reciters" />
      </DropdownToggle>

      <DropdownMenu right style={dropdownStyle}>
        <Scrollbars style={{ height: '20vh'}}>
          {
            (Reciters) ? Reciters.recitaitons.map((reciter, index) =>
              <DropdownItem  className={classes.nested} onClick={() => handleChange(reciter.id)} key={index}>
                {reciter.reciter_name_eng}
              </DropdownItem>) :
              <div className="wraper_laader">
                <div className="loader loadersmall"></div>
              </div>
          }
        </Scrollbars>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}

