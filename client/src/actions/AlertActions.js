import { SET_ALERT, CLEAR_ALERT } from "./types";
import { v4 } from "uuid";

export const setAlert = (msg, type, timeout = 5000) => async (dispatch) => {
  const id = v4();
  const alert = {
    msg,
    type,
    id,
  };
  dispatch({
    type: SET_ALERT,
    payload: alert,
  });

  await sleep(timeout);
  dispatch({
    type: CLEAR_ALERT,
    payload: id,
  });
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
