import React, { useState } from 'react'
import styled from "styled-components"
import { Paper} from "@material-ui/core"
import {Typography,withStyles,InputAdornment,TextField} from '@material-ui/core';
import { Link } from 'react-router-dom';
// import sigupStyles from "../Login/LoginInput/logininp.module.css"
import sigupStyles from "./signup.module.css"
import FacebookIcon from '@material-ui/icons/Facebook';

function Registration() {
    // const init = {
    //     email:"",
    //     password :""
    // }
    // const dispatch = useDispatch()
    // const {isAuth} = useSelector(state=>state.login)
    const [showPassword,setShowPassword] = useState(false)
    // const [values,setValues] = useState(init)
    // const handleChange=(e)=>{
    //     const {name,value} = e.target
    //     setValues({...values,[name]:value})
    // }
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    // const handleLogin=()=>{
    //     dispatch(loginUser(values))
    // }
    // if(isAuth){
    //   return <Redirect to={'/'} push/>
    // }

    return (
        <div className={sigupStyles.main}>
            <Paper className={sigupStyles.inppaper}>
                <div>
                    <img width="50%" src="https://cdn2.downdetector.com/static/uploads/logo/Instagram_Logo_Large.png" alt="" />
                </div>
                <p className={sigupStyles.para}>Sign up to see photos and videos from your friends.</p>
                <br />
                <div className={sigupStyles.fbsignupbtn}>
                    <FacebookIcon style={{color:"white"}}/>
                    <p>Log in with Facebook</p>
                </div>
                <div className={sigupStyles.or_div}>
                        <div></div>
                        <p>OR</p>
                        <div></div>
                </div>
                <div className={sigupStyles.inpBorder}>
                    <Styledinp 
                        // onChange={handleChange} 
                        label="Phone number or email" 
                        name="email" 
                        type='email' 
                        variant="filled" />
                </div>
                <div className={sigupStyles.inpBorder}>
                    <Styledinp 
                        // onChange={handleChange} 
                        label="Full Name" 
                        name="email" 
                        type='email' 
                        variant="filled" />
                </div>
                <div className={sigupStyles.inpBorder}>
                    <Styledinp 
                        // onChange={handleChange} 
                        label="Username" 
                        name="email" 
                        type='email' 
                        variant="filled" />
                </div>
                <div className={sigupStyles.inpBorder}>
                    <Styledinp
                        variant="filled"  
                        name="password"
                        size="small"  
                        type={showPassword? 'text' : 'password'}
                        label= "Password"
                        // // value={showPassword.password}
                        // // onChange={handleChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                {<Typography
                                    style={{marginTop:"12px",cursor: "pointer"}}
                                    onClick={handleClickShowPassword}
                                    >
                                    {showPassword? `hide` : `show`}
                                </Typography>}
                                </InputAdornment>
                            ),
                        }}
                        />
                </div>
                <SignupBtn 
                    // onClick={handleLogin} 
                    // disabled={values.password && values.email?false:true}
                    >Sign up</SignupBtn>
                <p className={sigupStyles.afterbtnPara}>By signing up, you agree to our Terms , Data Policy and Cookies Policy .</p>
            </Paper>
            <br />
            <Paper className={sigupStyles.loginpaper}>
                <Typography >Have an account? <Link className={sigupStyles.login_link} to={'/login'}>Log in</Link></Typography>
            </Paper>
            <div className={sigupStyles.getapp_div} >
                <p>Get the app</p>
                <div className={sigupStyles.dlwd_img} >
                    <img width="120px" src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png" alt="" />
                    <img width="120px" src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Registration

const SignupBtn = styled.button`
    background-color: #0095F6;
    border: none;
    outline: none;
    padding: .4rem;
    color: white;
    font-weight: 600;
    border-radius: .2rem;
    margin-top: 10px;
    :hover{
        cursor: pointer;
    }
    :disabled{
        opacity: .5;
    } 
`

const Styledinp =  withStyles((theme) => ({
    root: {
      width:"100%",
      "& .MuiInputBase-root": {
        height:30,
        background:"none",
        "& input": {
            fontSize:"13px",
            height:"30px"
        }
      },
      "& .MuiFilledInput-underline:before":{
          border:"none",
          color:"grey"
      },
      "& .MuiFilledInput-underline:after":{
          color:"grey",
          border:"none"
      },
      "& .MuiFormLabel-root": {
        fontSize:"12px",
        height:18,
        margin:"-4px 0px 0px 0px",
        "& label": {
            height:18,
            fontSize:"15px"
        }
      },
    }
  }))(TextField)

