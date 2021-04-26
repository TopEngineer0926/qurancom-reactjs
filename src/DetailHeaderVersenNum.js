import React,{useContext,useState} from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "./LangDropdown.css";
import {ChosenVerseFlagContext,ChosenVerseAndPageContext,CurrentPageContext,LoadingContext,VERSESCONTEXT} from "./Store";
import { FormattedMessage } from "react-intl";
import {DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller} from 'react-scroll'
import {goToTop} from 'react-scrollable-anchor'

const Style = {
  textDecoration: "none",
  fontSize: "14px",
  color: "#56c0d0"
};
function scrollTo(to) {
  
  if (to != 0) 
      scroller.scrollTo("verse-index" +(to-1), {
          duration: 800,
          delay: 0,
          smooth: 'easeInOutQuart',
          offset: -200
      })
}
function Verse(props) {
  const Total=props.VerseTotal;
  const [isChosen, setChosen] = useContext(ChosenVerseFlagContext);
  const [OffsetandPage, setPageandOffset] = useContext(ChosenVerseAndPageContext);
  const[Currentpage,setCurrentPage]=useContext(CurrentPageContext);
  const [isLoading, setLoading]=useContext(LoadingContext);
  const [Verses, setVerses] = useContext(VERSESCONTEXT);

  const [found, setfound] =useState(0);
  
  var VerseNumbers=[];
  for(var i=0; i<Total;i++){
VerseNumbers.push(i+1);

  }
 

  return (
    <UncontrolledDropdown>
      <DropdownToggle nav caret style={Style}>
      <FormattedMessage id="Verses"/>
      </DropdownToggle>
      <DropdownMenu style={{height: "12vw", overflowY: "scroll"}} >
     {VerseNumbers.map((num,index)=>
        <DropdownItem className="stripe" onClick={()=>{
          console.log(Verses);
          {Array.isArray(Verses) ? 
            Verses.map((mem) =>
            (num===mem.verse_number)?
            scrollTo(num)
          
            :
          console.log(Verses[Verses.length-1].verse_number+ "and..."+ Verses[0].verse_number))
          :   console.log("waiting...")}
       

         if(Verses[Verses.length-1].verse_number<num || num < Verses[0].verse_number){ 
          setChosen(true)
          setPageandOffset( {Chosenpage: 1+(Math.trunc(num/10)),
          offset: num%10});
        
          goToTop()
             }
        
      }} key={index}> {num}
      </DropdownItem>
     )}
  
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}
export default Verse;
