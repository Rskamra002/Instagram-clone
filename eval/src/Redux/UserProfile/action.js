import {
  USER_DATA_FAILURE,
  USER_DATA_REQUEST,
  USER_DATA_SUCCESS,
  USER_POSTS_FAILURE,
  USER_POSTS_REQUEST,
  USER_POSTS_SUCCESS,
} from "./actionType";
import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://json-server-mocker-neeraj-data.herokuapp.com",
});

const userDataRequest = () => {
  return {
    type: USER_DATA_REQUEST,
  };
};

const userDataSuccess = (payload) => {
  return {
    type: USER_DATA_SUCCESS,
    payload,
  };
};

const userDataFailure = (err) => {
  return {
    type: USER_DATA_FAILURE,
    payload: err,
  };
};

const userPostsRequest = () => {
  return {
    type: USER_POSTS_REQUEST,
  };
};

const userPostsSuccess = (payload) => {
  return {
    type: USER_POSTS_SUCCESS,
    payload,
  };
};

const userPostsFailure = (err) => {
  return {
    type: USER_POSTS_FAILURE,
    payload: err,
  };
};

export const getUserData = (user) => (dispatch) => {
  dispatch(userDataRequest());
  const config = {
    url: `/instaUsers?username=${user.username}`,
    method: "get",
  };
  axios(config)
    .then((res) => {
      dispatch(userDataSuccess(res.data[0]));
    })
    .catch((err) => {
      dispatch(userDataFailure(err));
    });
};

export const getUserPosts = (id) => (dispatch) => {
  dispatch(userPostsRequest());
  const config = {
    url: `/instaPosts?userId=${id}`,
    method: "get",
  };
  axios(config)
    .then((res) => {
      dispatch(userPostsSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(userPostsFailure(err));
    });
};
