import axios from 'axios';
import {
  GET_NOTIFICATIONS_FAILURE,
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
} from './actionTypes';

export const getNotificationsRequest = (payload) => {
  return {
    type: GET_NOTIFICATIONS_REQUEST,
  };
};

export const getNotificationsSuccess = (payload) => {
  return {
    type: GET_NOTIFICATIONS_SUCCESS,
    payload,
  };
};

export const getNotificationsFailure = (payload) => {
  return {
    type: GET_NOTIFICATIONS_FAILURE,
    payload,
  };
};

export const getNotifications = (username) => (dispatch) => {
  dispatch(getNotificationsRequest());
  axios
    .get(`http://localhost:2511/notifications/${username}`)
    .then((res) => {
      dispatch(getNotificationsSuccess(res.data.data));
    })
    .catch((err) => {
      dispatch(getNotificationsFailure(err));
    });
};
