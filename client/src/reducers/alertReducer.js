import { SET_ALERT, CLEAR_ALERT } from "../actions/types";
const initialState = {
  alert: []
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        alert: [...state.alert, action.payload]
      };
    case CLEAR_ALERT:
      return {
        ...state,
        alert: state.alert.filter(alert => alert.id !== action.payload)
      };
    default:
      return state;
  }
};
