import {
  GET_NOTIFICATIONS_FAILURE,
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  NOTIFICATION_SEEN,
} from './actionTypes';

const initState = {
  isLoading: false,
  isError: false,
  notificationLength: 0,
  allNotifications: [],
  isNewNotificationSeen: true,
};

export const notificationReducer = (
  state = initState.allNotifications,
  { type, payload }
) => {
  switch (type) {
    case GET_NOTIFICATIONS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case GET_NOTIFICATIONS_SUCCESS: {
      // let status = true;
      // if (payload.length > state.notificationLength) {
      //   status = false;
      // }
      return {
        ...state,
        isLoading: false,
        allNotifications: [...payload].sort((a, b) => {
          return b.timestamp - a.timestamp;
        }),
        notificationLength: payload.length,
        isNewNotificationSeen: true,
      };
    }

    case GET_NOTIFICATIONS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }

    case NOTIFICATION_SEEN: {
      return {
        ...state,
        isNewNotificationSeen: true,
      };
    }

    default: {
      return state;
    }
  }
};
