import React from 'react'
import Slider from './Slider/Slider'
import LoginInp from './LoginInput/LoginInp'

function Login() {
    // justify-content: center;
    // margin: 32px auto 0;
    // max-width: 935px;
    // padding-bottom: 32px;
    // width: 100%;
    return (
        <div style={{background:"rgb(250,250,250)",width:"100%",maxWidth:"935px",display:'flex',margin:"auto",padding:"2rem"}}>

            <div style={{width:"50%"}}>
                <Slider/>
            </div>
            <div  style={{width:"40%"}}>
                <LoginInp/>
                
            </div>
        </div>
    )
}

export default Login
