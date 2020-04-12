import {
  LOAD_NOTIFICATIONS,
  CLEAR_NOTIFICATION,
  DELETE_NOTIFICATION,
  DELETE_ALL_NOTIFICATIONS,
  CLEAR_ALL_NOTIFICATIONS,
} from "../actions/types";
const initialState = {
  notifications: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };
    case CLEAR_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          notification._id !== action.payload._id
            ? notification
            : action.payload
        ),
      };
    case CLEAR_ALL_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };
    case DELETE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification._id !== action.payload._id
        ),
      };
    case DELETE_ALL_NOTIFICATIONS:
      return {
        ...state,
        notifications: [],
      };
    default:
      return state;
  }
};
