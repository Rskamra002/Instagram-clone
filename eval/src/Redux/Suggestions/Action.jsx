import axios from "axios"
import { GET_USER_FAIL, GET_USER_REQ, GET_USER_SUC } from "./Actiontype"

export const getUserReq = () => {
    return {
        type: GET_USER_REQ,
    }
}

export const getUserSuc = (payload) => {
    return{
        type:GET_USER_SUC,
        payload
    }
}
export const getUserFail = (error) => {
    return{
        type:GET_USER_FAIL,
        payload: error
    }
}

export const getUsers = () => (dispatch) => {
    dispatch(getUserReq())
    return axios.get("https://json-server-mocker-neeraj-data.herokuapp.com/instaUsers")
    .then(res => dispatch(getUserSuc(res.data)))
    .catch(err => dispatch(getUserFail(err)))
}
