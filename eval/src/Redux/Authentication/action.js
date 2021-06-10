import axios from "axios"
import { LOGIN_FAIL, LOGIN_REQ, LOGIN_SUC, LOGOUT_SUC } from "./actionType"

export const loginReq=()=>{
    return{
        type:LOGIN_REQ
    }
}
export const loginSuc=(payload)=>{
    return{
        type:LOGIN_SUC,
        payload
    }    
}
export const loginFail=()=>{
    return{
        type:LOGIN_FAIL
    }    
}
export const logout_suc=()=>{
    return{
        type:LOGOUT_SUC,
    }    
}

export const loginUser = ({email,password}) => (dispatch) => {
    dispatch(loginReq())
    return axios.get("https://json-server-mocker-neeraj-data.herokuapp.com/instaUsers")
    .then(res => res.data.map(item=>((item.username === email || item.email === email) && item.password===password)?dispatch(loginSuc(item)):item))
    .catch(err => dispatch(loginFail(err)))
}
