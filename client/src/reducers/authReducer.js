import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  SET_LOADING,
  CLEAR_ERROR,
  SET_AUTH_LOADING,
  CLEAR_AUTH_LOADING,
} from "../actions/types";
const initialState = {
  user: null,
  isAuthenticated: null,
  error: null,
  loading: true,
  token: null,
  isAdmin: false,
  isUserChecked: true,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_AUTH_LOADING:
      return {
        ...state,
        loading: null,
      };
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        error: null,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        error: action.payload,
        loading: false,
      };
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        error: null,
        isAuthenticated: true,
        loading: false,
        token: localStorage.token,
        isAdmin: action.payload.isAdmin,
        isUserChecked: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case AUTH_ERROR:
      return {
        ...state,
        user: null,
        error: "Authentication Failed",
        isAuthenticated: null,
        loading: false,
        isUserChecked: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        error: null,
        isAuthenticated: true,
        token: action.payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
        token: null,
        isAuthenticated: null,
        user: null,
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        error: null,
        token: null,
        isAuthenticated: null,
        user: null,
        loading: false,
      };
    default:
      return state;
  }
};
