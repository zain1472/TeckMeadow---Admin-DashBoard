import {
  ADD_MESSAGE,
  SET_LOADING,
  SET_CONTACTS,
  SET_CONNECTION,
  SET_SOCKET,
  CLEAR_SOCKET,
  SET_IS_CHAT_ACTIVE,
  CLEAR_IS_CHAT_ACTIVE,
  SET_CHATS,
  SET_CURRENT_EMPLOYEE,
  SET_FILTER,
  CLEAR_FILTER,
  APP_ERROR,
  SET_EMPLOYEES,
  CLEAR_CURRENT_EMPLOYEE,
} from "../actions/types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

// Search the contacts and the chats

export const searchEmployees = (text) => {
  return {
    type: SET_FILTER,
    payload: text,
  };
};

// Clear the chat search results

export const clearSearch = () => ({
  type: CLEAR_FILTER,
});

// Set the chats in sidebar
export const getEmployees = (employees) => async (dispatch) => {
  setAuthToken(localStorage.token);
  dispatch({
    type: SET_LOADING,
  });
  try {
    const res = await axios.get("/api/employees");
    dispatch({
      type: SET_EMPLOYEES,
      payload: res.data.employees,
    });
  } catch (error) {
    dispatch({
      type: APP_ERROR,
      payload: error,
    });
  }
  dispatch({
    type: SET_CHATS,
    payload: employees,
  });
};
// set the contacts in sidebar

// add a new message
export const addMessage = (message) => (dispatch) => {
  dispatch({
    type: ADD_MESSAGE,
    payload: message,
  });
};
export const setCurrentEmployee = (employee) => {
  setIsChatActive();
  return {
    type: SET_CURRENT_EMPLOYEE,
    payload: employee,
  };
};
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

// Side Bar Active tab actions
export const setIsChatActive = () => {
  return {
    type: SET_IS_CHAT_ACTIVE,
  };
};
export const clearIsChatActive = () => {
  return {
    type: CLEAR_IS_CHAT_ACTIVE,
  };
};
export const setSocket = (socket) => (dispatch) => {
  dispatch({
    type: SET_SOCKET,
    payload: socket,
  });
};

export const clearSocket = () => (dispatch) => {
  dispatch({
    type: CLEAR_SOCKET,
  });
};
export const clearCurrentEmployee = () => ({
  type: CLEAR_CURRENT_EMPLOYEE,
});
