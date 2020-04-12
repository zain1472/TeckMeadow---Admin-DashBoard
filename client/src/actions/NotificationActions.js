import {
  LOAD_NOTIFICATIONS,
  CLEAR_NOTIFICATION,
  DELETE_NOTIFICATION,
  APP_ERROR,
  DELETE_ALL_NOTIFICATIONS,
  CLEAR_ALL_NOTIFICATIONS,
} from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
export const loadNotifications = () => async (dispatch) => {
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get("/api/notifications");
    dispatch({
      type: LOAD_NOTIFICATIONS,
      payload: res.data.notifications,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: APP_ERROR,
      payload: error.response.data.msg,
    });
  }
};

export const clearNotification = (notification) => async (dispatch) => {
  setAuthToken(localStorage.token);

  try {
    const res = await axios.put(`/api/notifications/${notification._id}`);
    dispatch({
      type: CLEAR_NOTIFICATION,
      payload: res.data.notification,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: APP_ERROR,
      payload: error.response.data.msg,
    });
  }
};

export const clearAllNotifications = () => async (dispatch) => {
  setAuthToken(localStorage.token);

  try {
    const res = await axios.put(`/api/notifications/`);
    dispatch({
      type: CLEAR_ALL_NOTIFICATIONS,
      payload: res.data.notifications,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: APP_ERROR,
      payload: error.response.data.msg,
    });
  }
};

export const deleteNotification = (notification) => async (dispatch) => {
  setAuthToken(localStorage.token);

  try {
    const res = await axios.delete(`/api/notifications/${notification._id}`);
    dispatch({
      type: DELETE_NOTIFICATION,
      payload: res.data.notification,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: APP_ERROR,
      payload: error.response.data.msg,
    });
  }
};
export const deleteAllNotifications = () => async (dispatch) => {
  setAuthToken(localStorage.token);

  try {
    const res = await axios.delete(`/api/notifications/`);
    dispatch({
      type: DELETE_ALL_NOTIFICATIONS,
      payload: res.data.notification,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: APP_ERROR,
      payload: error.response.data.msg,
    });
  }
};
