import axios from "axios"
import { GET_STORY_FAIL, GET_STORY_REQ, GET_STORY_SUC } from "./actionType"

export const getStoryReq = () => {
    return {
        type: GET_STORY_REQ,
    }
}

export const getStorySuc = (payload) => {
    return{
        type:GET_STORY_SUC,
        payload
    }
}
export const getStoryFail = (error) => {
    return{
        type:GET_STORY_FAIL,
        payload: error
    }
}

export const getStory = () => (dispatch) => {
    dispatch(getStoryReq())
    return axios.get("https://k-books.herokuapp.com/instastory")
    .then(res => dispatch(getStorySuc(res.data)))
    .catch(err => dispatch(getStoryFail(err)))
}
