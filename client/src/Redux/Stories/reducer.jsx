import { GET_STORY_FAIL, GET_STORY_REQ, GET_STORY_SUC } from "./actionType"


const init = {
    isLoading : false,
    isError: false,
    story: null
}
export const storyReducer = (state = init, action) => {
    switch(action.type){
        case GET_STORY_SUC: {
            return{
                ...state,
                isLoading: false,
                isError: false,
                story: [...action.payload]
            }
        }
        case GET_STORY_REQ: {
            return{
                ...state,
                isLoading: true,
                isError: false,
            }
        }
        case GET_STORY_FAIL: {
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