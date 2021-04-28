import React, { useContext, useState } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "./LangDropdown.css";
import { ArbicFontSizeContext } from "./Store";
import { FormattedMessage } from "react-intl";
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

function ArabicSize(props) {
    const [ArbicFontSize, setArbicFontSize] = useContext(ArbicFontSizeContext);

  var StepNumbers = [];
  for (var i = 1; i < 300; i++) {
    StepNumbers.push(i * 3);

  }


  return (
    <UncontrolledDropdown>
      <DropdownToggle nav caret style={dropdownStyle}>
        {ArbicFontSize}px
      </DropdownToggle>
      <DropdownMenu style={dropdownStyle} >
        <Scrollbars style={{ height: '20vh' }}>
          {StepNumbers.map((num, index) =>
            <DropdownItem className="stripe" onClick={() => {
                setArbicFontSize(num);
            }} key={index}> {num}px
            </DropdownItem>
          )}
        </Scrollbars>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}
export default ArabicSize;
