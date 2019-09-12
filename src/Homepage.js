import React from "react";
import MainBody from "./HomeJumbotron";
import Surahss from "./HomeSurahs";
import Footer from "./Footer";
import Header from "./HomeHeader";

function Homepage() {
  
  return (
   <>
   
      <Header/>
            <MainBody />
            
      <Surahss />
          <Footer />
      
    </>
   
  );
}

export default Homepage;
