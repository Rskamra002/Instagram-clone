import {
  USER_DATA_FAILURE,
  USER_DATA_REQUEST,
  USER_DATA_SUCCESS,
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

export const getUserData = (id) => (dispatch) => {
  dispatch(userDataRequest());
  const config = {
    url: `/instaUsers?userId=${id}`,
    method: "get",
  };
  axios(config)
    .then((res) => {
      console.log("dataressss", res.data);
      dispatch(userDataSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(userDataFailure(err));
    });
};
