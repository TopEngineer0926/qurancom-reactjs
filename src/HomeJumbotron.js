import React,{useContext} from "react";
import Iqra from "./img/heroiqr.png";
import Bism from "./img/herobis.png";
import { FormattedMessage } from "react-intl";
import {Link} from "react-router-dom";
import {SurahContext,OffsetContext,CurrentPageContext,ChosenVerseFlagContext,ChosenVerseAndPageContext} from "./index";




function Main() {
  const [Surah, setSurahNo]=useContext(SurahContext);
  const [off, setOff] = useContext(OffsetContext);
  const[Currentpage,setCurrentPage]=useContext(CurrentPageContext);
  const [isChosen, setChosen] = useContext(ChosenVerseFlagContext);

  const [OffsetandPage, setPageandOffset] = useContext(ChosenVerseAndPageContext);

  return (
    <main className="indexmain">
      <div class="container">
        <div class="row d-flex justify-content-center mt-5">
          <img src={Bism} alt="logo" />
        </div>
        <div className="row d-flex justify-content-center mt-4">
          <img src={Iqra} class="img-fluid heroiqr" alt="Iqra" />
        </div>
        <div className="row d-flex justify-content-center mt-5 mb-2">

          <div className="searchbox" action="">  {/* Div to be replaced as form */}
          <FormattedMessage id="placeholder" defaultMessage="search">
{placeholder => <input type="text" placeholder={placeholder} />}
</FormattedMessage>
            
            <a href="">
              <i className="fas fa-search" />
            </a>
          </div>
          
        </div>
        <div class="row d-flex justify-content-center">
          <ul class="quicklinks align-items-center">
            <li class="btn disabled"><FormattedMessage id="Quick"/></li>|
            <li class="btn">
              <Link to="/36" onClick={()=>setSurahNo(36)}>Surah Yasin (Yaseen)</Link> 
              </li>
            <li class="btn">
            <Link to="/55"  onClick={()=>setSurahNo(55)}>Surah Ar-Rahman</Link> 
            </li>
            <li class="btn">
            <Link to="/67" onClick={()=>setSurahNo(67)} >Surah Al Mulk</Link> 
            </li>
            <li class="btn">
      <Link to="/18" onClick={()=>{setSurahNo(18); } } >
        Surah Al Kahf</Link> 
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
export default Main;
