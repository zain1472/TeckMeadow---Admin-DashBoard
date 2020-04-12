import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  SET_AUTH_LOADING,
  SET_CURRENT_USER,
  SET_LOADING,
  CLEAR_AUTH_LOADING,
} from "../actions/types";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";
export const registerUser = (formData) => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });
  try {
    const res = await axios.post("/api/users/", formData);
    console.log(res);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg });
  }
};

export const loginUser = (user) => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/auth", user, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.token,
    });
    localStorage.setItem("token", res.data.token);
    loadUser();
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.msg,
    });
    setAuthToken();
  }
};
// set the values of current User
export const loadUser = () => async (dispatch) => {
  setAuthToken(localStorage.token);
  dispatch({
    type: SET_AUTH_LOADING,
  });
  dispatch({
    type: SET_LOADING,
  });
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data.user,
    });
    dispatch({
      type: SET_CURRENT_USER,
      payload: res.data.user,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
// logout current user
export const logoutUser = () => {
  localStorage.removeItem("token");
  return {
    type: LOGOUT,
  };
};
// Set loading to true
export const setLoading = () => {
  console.log("setloading");
  return {
    type: SET_AUTH_LOADING,
  };
};
export const clearLoading = () => {
  console.log("setloading");
  return {
    type: CLEAR_AUTH_LOADING,
  };
};
