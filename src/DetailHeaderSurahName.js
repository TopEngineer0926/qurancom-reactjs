import React,{useContext} from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "./LangDropdown.css";  
import {SurahContext} from "./index";
import {Link} from "react-router-dom";
import {CurrentPageContext,LastPageContext,LoadingContext,OffsetContext} from "./index";




const Style = {
  textDecoration: "none",
  fontSize: "14px",
  color: "#56c0d0",
  
};
function Fatiha(props) {
 var Locate ="abcd"
const [SurahNo,setSurahNo]=useContext(SurahContext);
const[pageNo,setPage]=useContext(CurrentPageContext);
const[Lastpage,setLast]=useContext(LastPageContext);
const [isLoading, setLoading]=useContext(LoadingContext);
const [off, setOff] = useContext(OffsetContext);


  const id=SurahNo-1;
 
  return (
    <UncontrolledDropdown>
      <DropdownToggle nav caret style={Style}>
      {Array.isArray(props.ChapData)? props.ChapData[id]["name_simple"]:"Surahs"}
      
      </DropdownToggle>
      <DropdownMenu style={{height: "12vw", overflowY: "scroll"}}>
      {Array.isArray(props.ChapData)?props.ChapData.map((mem)=>
        <Link to={`/${mem.id}` } 
          
        onClick={()=>{ setSurahNo(mem.id)
            setPage(1)
            setOff(1) 
            setLast(0) 
            setLoading(true);
           }} 
           
            style={{textDecoration:"none"}}>
        <DropdownItem className="stripe" ><span>{mem.id} {mem.name_simple}</span> </DropdownItem>
        </Link>
      ):"Waiting for Surahs..."}
      </DropdownMenu>
    
    </UncontrolledDropdown>
  );
}
export default Fatiha;
