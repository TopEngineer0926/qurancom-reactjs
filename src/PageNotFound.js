import React from 'react'
import { Helmet } from 'react-helmet';
import Footer from "./Footer";
import Header from "./HomeHeader";

function Page() {

    
        return (

            <>
            <Helmet>
   <title> Islam Check | Page Not Found-404 </title>
   </Helmet>
   <Header/>
            <div className="flex-center position-ref full-height page404">
                <div className="content">
                    <h1 style={{color:'#56c0d0',fontSize:'70px'}}>404</h1>
                    <div className="title m-b-md">
                        Page <strong>Not</strong> Found!
                    </div>
                </div>
            </div>
            <Footer/> 
            </>

        )
    
}
export default Page;
