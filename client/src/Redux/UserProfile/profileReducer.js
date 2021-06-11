import {
  USER_DATA_FAILURE,
  USER_DATA_REQUEST,
  USER_DATA_SUCCESS,
  USER_POSTS_FAILURE,
  USER_POSTS_REQUEST,
  USER_POSTS_SUCCESS,
} from "./actionType";

const initState = {
  isLoading: false,
  isError: false,
  data: "",
  posts: [],
};

export const profileReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case USER_DATA_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case USER_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: payload,
      };
    }

    case USER_DATA_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }

    case USER_POSTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case USER_POSTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        posts: payload,
      };
    }

    case USER_POSTS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }

    default:
      return state;
  }
};
