import React from "react";
import MainBody from "./MainSearchBar";
import Surahss from "./HomeSurahs";
import Footer from "./Footer";
import Header from "./HomeHeader";
import { Helmet } from 'react-helmet';

function Homepage() {
  
  return (
    <>
    <Helmet>
   <title> Islam Check | Home</title>
   </Helmet>

      <Header/>
            <MainBody />
            
      <Surahss />
          <Footer />
     </> 
   
   
   
  );
}

export default Homepage;
