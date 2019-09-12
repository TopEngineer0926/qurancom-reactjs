  import React from "react";
  import "./search.css";
  
  
  function Search(){
  
  
  return(
              <form className="form-inline" action="">
              <input
                className="form-control shadow-none"
                type="text"
                placeholder="Search anything"
              />
              <a href="javascript:void(0);">
                <i className="fas fa-search"></i>
              </a>
            </form>
            );
  }
  export default Search;