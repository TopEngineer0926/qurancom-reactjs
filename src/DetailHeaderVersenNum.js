import React,{useContext} from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "./LangDropdown.css";
import {ChosenVerseFlagContext,ChosenVerseAndPageContext,CurrentPageContext,LoadingContext} from "./index";

const Style = {
  textDecoration: "none",
  fontSize: "14px",
  color: "#56c0d0"
};

function Verse(props) {
  const Total=props.VerseTotal;
  const [isChosen, setChosen] = useContext(ChosenVerseFlagContext);
  const [OffsetandPage, setPageandOffset] = useContext(ChosenVerseAndPageContext);
  const[Currentpage,setCurrentPage]=useContext(CurrentPageContext);
  const [isLoading, setLoading]=useContext(LoadingContext);
  var VerseNumbers=[];
  for(var i=0; i<Total;i++){
VerseNumbers.push(i+1);

  }
 

  return (
    <UncontrolledDropdown>
      <DropdownToggle nav caret style={Style}>
     Verses
      </DropdownToggle>
      <DropdownMenu style={{height: "12vw", overflowY: "scroll"}} >
     {VerseNumbers.map((num)=>
        <DropdownItem className="stripe" onClick={()=>{
          setChosen(true);
        setPageandOffset( {Chosenpage: 1+(Math.trunc(num/10)),
        offset: num%10});
       
        
      }}> {num}</DropdownItem>
     )}
  
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}
export default Verse;
