import {
  USER_DATA_FAILURE,
  USER_DATA_REQUEST,
  USER_DATA_SUCCESS,
} from "./actionType";

const initState = {
  isLoading: false,
  isError: false,
  data: "",
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
    default:
      return state;
  }
};
