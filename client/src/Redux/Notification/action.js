import axios from 'axios';
import {
  GET_NOTIFICATIONS_FAILURE,
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  NOTIFICATION_SEEN,
} from './actionTypes';

export const getNotificationsRequest = () => {
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

export const notificationSeen = () => {
  return {
    type: NOTIFICATION_SEEN,
  };
};

export const getNotifications = (username) => (dispatch) => {
  dispatch(getNotificationsRequest());
  axios
    .get(`http://localhost:2511/notifications/${username}`)
    .then((res) => {
      dispatch(getNotificationsSuccess(res.data.data.notifications));
    })
    .catch((err) => {
      dispatch(getNotificationsFailure(err));
    });
};
