import React from 'react'

function Page() {
    console.log("page entered");
    
        return (

            <>
            <div class="flex-center position-ref full-height page404">
                <div class="content">
                    <h1 style={{color:'#56c0d0',fontSize:'70px'}}>404</h1>
                    <div class="title m-b-md">
                        Page <strong>Not</strong> Found!
                    </div>
                </div>
            </div>
            </>

        )
    
}
export default Page;
