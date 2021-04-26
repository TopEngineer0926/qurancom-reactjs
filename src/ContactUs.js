import React, { Component, useState } from 'react'
import Footer from "./Footer"
import { Helmet } from 'react-helmet';


   
function Contact(){

   

    const [ShowRequired,setRequiredMsg]=useState(false);
    const [SimpleForm,setSimpleForm]=useState(true);

    const mySubmitHandler = (event) => {
        var email = document.forms["Contact"]["Email"].value;
        var Subj = document.forms["Contact"]["Subject"].value;
        var Desc = document.forms["Contact"]["Desc"].value;
        if (email === "" || Subj === "" || Desc === "" ) {
            setRequiredMsg(true)
          event.preventDefault();
        }
        else{
            setSimpleForm(false);
            setRequiredMsg(false);
                    }
        
      }
   
        return (
            <>
             <Helmet>
    <title> Islam Check | Contact Us</title>
    </Helmet>
 
        <div className="contactus_section">
            <div className="contactus_banner ">
                <div className="container">
                    <div className="row ">
                        <div className="col-md-12 text-center contactus_banner_container">
                            <a href="/">
                                <img src="https://assets-1f14.kxcdn.com/images/logo-lg-w.png" className="contactus_banner_websitelogo pb-3" alt="logo"/>
                            </a>
                            <h4 className="contactus_banner_heading">CONTACT US</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="about_desc_text container pt-5 pb-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                  { (SimpleForm)? 
                        <form name="Contact" onSubmit={mySubmitHandler}>

                            <div className="form-group">
                                <label>Email Address <span className="staric_form_label">*</span></label>
                                <input type="email" name="Email" className="form-control" placeholder="Enter Email Address"/>
                            </div>
                            <div className="form-group">
                                <label>Subject <span className="staric_form_label">*</span></label>
                                <input  name="Subject" className="form-control" placeholder="Enter Subject"/>
                                
                            </div>
                            <div className="form-group">
                                <label>Description <span className="staric_form_label">*</span></label>
                                <textarea name="Desc" className="form-control" id="exampleFormControlTextarea1" rows="5" placeholder="Description"></textarea>
                                <small className="form-text text-muted">Please enter the details of your request. A member of our support staff will respond as soon as possible.</small>
                            </div>
                            {ShowRequired && <small className="form-text text-muted fillspacestxt" >*Please fill all the required fields</small>}
                            <button type="submit" className="btn btn-primary contactus_form_submit_btn">Submit</button>
                            
                        </form>:
                        <>
                        <h6 className="thankyoutxt">
                            Thank you for reaching out to us.   
                            <i className="fas fa-times" onClick={()=>setSimpleForm(true)}></i>
                        </h6>
                        <form name="Contact" onSubmit={mySubmitHandler}>

                        <div className="form-group">
                            <label>Email Address <span className="staric_form_label">*</span></label>
                            <input type="email" name="Email" className="form-control" placeholder="Enter Email Address"/>
                        </div>
                        <div className="form-group">
                            <label>Subject <span className="staric_form_label">*</span></label>
                            <input  name="Subject" className="form-control" placeholder="Enter Subject"/>
                            
                        </div>
                        <div className="form-group">
                            <label>Description <span className="staric_form_label">*</span></label>
                            <textarea name="Desc" className="form-control" id="exampleFormControlTextarea1" rows="5" placeholder="Description"></textarea>
                            <small className="form-text text-muted">Please enter the details of your request. A member of our support staff will respond as soon as possible.</small>
                        </div>
                        {ShowRequired && <small className="form-text text-muted"><h6>*Please fill all the required fields</h6></small>}
                        <button type="submit" className="btn btn-primary contactus_form_submit_btn">Submit</button>
                        
                    </form>
                    </>
                        
                        }
                    </div>
                </div>
            </div>
        </div> 
        <Footer/>
        </>
        )
    }

export default Contact;