import {
  GET_NOTIFICATIONS_FAILURE,
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
} from './actionTypes';

const initState = {
  isLoading: false,
  isError: false,
  allNotifications: [],
  isSeen: false,
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
      return {
        ...state,
        isLoading: false,
        allNotifications: [...payload],
        isSeen: false,
      };
    }

    case GET_NOTIFICATIONS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }

    case NOTIFICATIONS_SEEN: {
      return {
        ...state,
        isSeen: true,
      };
    }
  }
};
