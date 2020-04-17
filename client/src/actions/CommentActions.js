import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./AlertActions";
import { APP_ERROR, ADD_COMMENT, DELETE_COMMENT } from "./types";

export const addComment = (comment, project) => async (dispatch) => {
  setAuthToken(localStorage.token);
  try {
    comment.projectId = project._id;
    const res = await axios.post(`/api/comments`, comment, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: ADD_COMMENT,
      payload: res.data.project,
    });
  } catch (error) {
    dispatch({
      type: APP_ERROR,
      payload: error.response.msg,
    });
  }
};

export const deleteComment = (comment, project) => async (dispatch) => {
  setAuthToken(localStorage.token);
  comment.projectId = project._id;
  try {
    await axios.delete(`/api/comments/${comment._id}`);
    dispatch({
      type: DELETE_COMMENT,
      payload: comment,
    });
    dispatch(setAlert("Successfully deleted the comment...", "success"));
  } catch (error) {
    dispatch({
      type: APP_ERROR,
      payload: error.response.data.msg,
    });
  }
};
