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

export const notificationSeenSuccess = () => {
  return {
    type: NOTIFICATION_SEEN,
  };
};

export const getNotifications = (username) => (dispatch) => {
  dispatch(getNotificationsRequest());
  axios
    .get(`http://localhost:2511/notifications/${username}`)
    .then((res) => {
      dispatch(
        getNotificationsSuccess({
          notifications: res.data.data.notifications,
          isNewNotification: res.data.data.isNewNotification,
        })
      );
    })
    .catch((err) => {
      dispatch(getNotificationsFailure(err));
    });
};

export const notificationSeen = (username) => (dispatch) => {
  axios
    .patch(`http://localhost:2511/notifications/seen/${username}`)
    .then((res) => {
      dispatch(notificationSeenSuccess(true));
    });
};
