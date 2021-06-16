import { loadData } from "../../Utils/localStorage"
import { GET_USER_FAIL, GET_USER_REQ, GET_USER_SUC } from "./Actiontype"

const loggedInUser = loadData('users')
const init = {
    isLoading : false,
    isError: false,
    user: null
}
export const userReducer = (state = init, action) => {
    switch(action.type){
        case GET_USER_SUC: {
            return{
                ...state,
                isLoading: false,
                isError: false,
                user: [...action.payload.filter((item) => item._id !== loggedInUser._id)]
            }
        }
        case GET_USER_REQ: {
            return{
                ...state,
                isLoading: true,
                isError: false,
            }
        }
        case GET_USER_FAIL: {
            return{
                ...state,
                isError: true,
                isLoading: false,
            }
        }
        default:
            return state
    }
}