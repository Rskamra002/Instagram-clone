import {
  GET_NOTIFICATIONS_FAILURE,
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  NOTIFICATION_SEEN,
} from './actionTypes';

const initState = {
  isLoading: false,
  isError: false,
  allNotifications: [],
  isNewNotification: false,
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
      const { notifications, isNewNotification } = payload;
      return {
        ...state,
        isLoading: false,
        allNotifications: [...notifications].sort((a, b) => {
          return b.timestamp - a.timestamp;
        }),
        isNewNotification: isNewNotification,
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
        isNewNotification: false,
      };
    }

    default: {
      return state;
    }
  }
};
