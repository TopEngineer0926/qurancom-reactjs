import React from "react";

function Sub(props){
 const status= props.isOpen;
 console.log(status);
 
if(status){
    return(
        <div>
                <ul>
                      <li>
                        <a href="javascript:void(0);">
                          AbdulBaset AbdulSamad (Murattal)
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">
                          AbdulBaset AbdulSamad (Mujawwad)
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">
                          Abdur-Rahman as-Sudais
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">
                          Abu Bakr al-Shatri
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">
                          Hani ar-Rifai
                        </a>
                      </li>
                    </ul>
                    </div>);
                    }
                    return;
}
export default Sub;