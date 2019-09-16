  import React from "react";
  import "./search.css";
  import { FormattedMessage } from "react-intl";
  
  function Search(){
  
  
  return(
              <form className="form-inline" action="">
                <FormattedMessage id="placeholder" defaultMessage="search">
                {placeholder =>  <input
                className="form-control shadow-none"
                type="text"
                placeholder={placeholder} 
                /> }
              
              </FormattedMessage> 
              <a href="javascript:void(0);">
                <i className="fas fa-search"></i>
              </a>
            </form>
            );
  }
  export default Search;