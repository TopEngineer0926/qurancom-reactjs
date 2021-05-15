import React, { useContext, useState, useEffect } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "./LangDropdown.css";
import { SurahContext } from "./Store";
import { Link } from "react-router-dom";
import { CurrentPageContext, LastPageContext, LoadingContext, OffsetContext, DropDownChapterContext } from "./Store";
import { FormattedMessage } from "react-intl";
import { Scrollbars } from 'react-custom-scrollbars';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme)=>({
    menuItemStyle: {
        height: 33,
        minWidth: 105,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    listItemStyle: {
      width: 200,
      overflow: 'hidden'
    }
}));

const dropdownStyle = {
  textDecoration: "none",
  fontSize: 12,
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  color: "white",
  backgroundColor: '#c2719f',
  borderRadius: 5
}
function Fatiha(props) {
  var Locate = "abcd"
  const [SurahNo, setSurahNo] = useContext(SurahContext);
  const [pageNo, setPage] = useContext(CurrentPageContext);
  const [Lastpage, setLast] = useContext(LastPageContext);
  const [isLoading, setLoading] = useContext(LoadingContext);
  const [off, setOff] = useContext(OffsetContext);
  const [Content, setData] = useContext(DropDownChapterContext);
  const classes = useStyles();


  const [Active, setActive] = useState();
  const id = SurahNo - 1;

  return (
    <UncontrolledDropdown>
      <DropdownToggle nav caret style={dropdownStyle} className={classes.menuItemStyle}>
        {Array.isArray(props.ChapData) &&props.ChapData[id]? props.ChapData[id]["name_simple"] : "-"}
      </DropdownToggle>
      <DropdownMenu style={dropdownStyle} className={classes.listItemStyle}>
        <Scrollbars style={{ height: '20vh' }}>
          {Array.isArray(props.ChapData) ? props.ChapData.map((mem, ind) =>
            <Link key={`Surah_${ind}`} to={`/${mem.id}`}

              onClick={() => {
                setSurahNo(mem.id)
                setPage(1)
                setOff(1)
                setLast(0)
                setLoading(true);
              }}

              style={{ textDecoration: "none" }}>

              <DropdownItem className={(mem.id) ? (SurahNo == mem.id) ? "stripe Selected" : "stripe" : "stripe ...."}>
                <span>{mem.id} &nbsp;&nbsp;{mem.name_simple}</span> </DropdownItem>

            </Link>

          ) : "Waiting for Surahs..."}
        </Scrollbars>
      </DropdownMenu>

    </UncontrolledDropdown>
  );
}
export default Fatiha;
