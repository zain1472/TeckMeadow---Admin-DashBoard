import axios from "axios";
import {
  UPDATE_USER,
  APP_ERROR,
  SET_UPLOAD_PROGRESS,
  CLEAR_UPLOAD_PROGRESS,
  CREATE_NEW_PROJECT,
  LOAD_PROJECTS,
  DELETE_PROJECT,
  UPDATE_PROJECT,
  CATEGORIZE_PROJECTS,
  CLEAR_PROJECTS_SEARCH,
  CLEAR_PROJECT_CATEGORY,
  SEARCH_PROJECTS,
  SET_CURRENT_PROJECT,
  CLEAR_CURRENT_PROJECT,
  DELETE_USER,
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./AlertActions";
import { loadUser } from "./authActions";
import { setLoading } from "../actions/ChatActions";

// update a user
export const updateUser = (user) => async (dispatch) => {
  var formData = new FormData();
  formData.append("photo", user.image);
  formData.append("firstname", user.firstname);
  formData.append("lastname", user.lastname);
  formData.append("country", user.country);
  formData.append("isAdmin", user.isAdmin);

  setAuthToken(localStorage.token);
  try {
    const res = await axios.put("/api/users/" + user._id, formData, {
      onUploadProgress: (ProgressEvent) => {
        dispatch(
          setUploadProgress((ProgressEvent.loaded / ProgressEvent.total) * 100)
        );
      },
    });
    dispatch({
      type: UPDATE_USER,
      payload: res.data.updatedUser,
    });
    dispatch(setAlert("Successfully saved the changes... ", "success"));
    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: APP_ERROR,
      payload: error.response.data.msg,
    });
    dispatch(setAlert(error.response.data.msg, "danger"));
  }
};

// Delete A User
export const deleteUser = (user) => async (dispatch) => {
  setAuthToken(localStorage.token);
  try {
    const res = await axios.delete("/api/users/" + user._id);
    dispatch({
      type: DELETE_USER,
      payload: res.data.user,
    });
    dispatch(
      setAlert("Successfully deleted the user form database... ", "success")
    );
  } catch (error) {
    dispatch({
      type: APP_ERROR,
      payload: error.response.data.msg,
    });
    dispatch(setAlert(error.response.data.msg, "danger"));
  }
};

// Upload progress Actions
export const setUploadProgress = (progress) => ({
  type: SET_UPLOAD_PROGRESS,
  payload: progress,
});
export const clearUploadProgress = () => ({
  type: CLEAR_UPLOAD_PROGRESS,
});

// =================
// Project Actions
// =================

// Load all Projects
export const loadProjects = () => async (dispatch) => {
  setAuthToken(localStorage.token);
  dispatch(setLoading());
  try {
    const res = await axios.get("/api/projects/");
    dispatch({
      type: LOAD_PROJECTS,
      payload: res.data.projects,
    });
  } catch (error) {
    dispatch({
      type: APP_ERROR,
      payload: error.response.data.msg,
    });
    dispatch(setAlert(error.response.data.msg, "danger"));
  }
};

// Create a new project
export const assignProject = (project) => async (dispatch) => {
  var formData = new FormData();
  formData.append("title", project.title);
  formData.append("description", project.description);
  formData.append("dueDate", project.dueDate);
  for (var x = 0; x < project.files.length; x++) {
    formData.append("files", project.files[x]);
  }
  formData.append("price", project.price);
  formData.append("employee", project.employee);
  console.log(project.files);
  setAuthToken(localStorage.token);
  try {
    const res = await axios.post("/api/projects/", formData, {
      onUploadProgress: (ProgressEvent) => {
        dispatch(
          setUploadProgress((ProgressEvent.loaded / ProgressEvent.total) * 100)
        );
      },
    });
    dispatch({
      type: CREATE_NEW_PROJECT,
      payload: res.data.project,
    });
    dispatch(setAlert("Successfully assigned a new project... ", "success"));
  } catch (error) {
    dispatch({
      type: APP_ERROR,
      payload: error.response.data.msg,
    });
    dispatch(setAlert(error.response.data.msg, "danger"));
  }
};

// Add files to a current project
export const addFiles = (project, files) => async (dispatch) => {
  var formData = new FormData();

  for (var x = 0; x < files.length; x++) {
    formData.append("files", files[x]);
  }
  setAuthToken(localStorage.token);
  try {
    const res = await axios.post(
      `/api/projects/${project._id}/addfile`,
      formData,
      {
        onUploadProgress: (ProgressEvent) => {
          dispatch(
            setUploadProgress(
              (ProgressEvent.loaded / ProgressEvent.total) * 100
            )
          );
        },
      }
    );
    dispatch({
      type: UPDATE_PROJECT,
      payload: res.data.project,
    });
    dispatch(
      setAlert("Successfully addedd files to the project... ", "success")
    );
  } catch (error) {
    dispatch({
      type: APP_ERROR,
      payload: error.response.data.msg,
    });
    dispatch(setAlert(error.response.data.msg, "danger"));
  }
};

// DELETE a project
// @ACCESS admin only
export const deleteProject = (project) => async (dispatch) => {
  setAuthToken(localStorage.token);
  dispatch(setAlert("Deleting Project...", "primary"));
  try {
    const res = await axios.delete("/api/projects/" + project._id);
    dispatch({
      type: DELETE_PROJECT,
      payload: res.data.project,
    });
    dispatch(setAlert("Successfully deleted the project... ", "success"));
  } catch (error) {
    dispatch({
      type: APP_ERROR,
      payload: error.response.data.msg,
    });
    dispatch(setAlert(error.response.data.msg, "danger"));
  }
};

// PROJECT STATUS ACITONS
// /api/projects/:id/:status
export const changeProjectStatus = (project, status) => async (dispatch) => {
  setAuthToken(localStorage.token);
  dispatch(setAlert("Updating Project...", "primary"));
  try {
    const res = await axios.get("/api/projects/" + project._id + "/" + status);
    dispatch({
      type: UPDATE_PROJECT,
      payload: res.data.project,
    });
    dispatch(setAlert("Successfully updated the project... ", "success"));
  } catch (error) {
    dispatch({
      type: APP_ERROR,
      payload: error.response.data.msg,
    });
    dispatch(setAlert(error.response.data.msg, "danger"));
  }
};
// edit project
export const editProject = (project) => async (dispatch) => {
  setAuthToken(localStorage.token);
  dispatch(setAlert("Editing Project...", "primary"));
  try {
    const res = await axios.put("/api/projects/" + project._id, project, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res.data.project);
    dispatch({
      type: UPDATE_PROJECT,
      payload: res.data.project,
    });
    dispatch(setAlert("Successfully updated the project... ", "success"));
  } catch (error) {
    dispatch({
      type: APP_ERROR,
      payload: error.response.data.msg,
    });
    dispatch(setAlert(error.response.data.msg, "danger"));
  }
};
// categorize projects
export const categorizeProjects = (status) => ({
  type: CATEGORIZE_PROJECTS,
  payload: status,
});
export const clearProjectCategory = () => ({
  type: CLEAR_PROJECT_CATEGORY,
});
// search projects
export const searchProjects = (text) => ({
  type: SEARCH_PROJECTS,
  payload: text,
});
export const clearProjectsSearch = () => ({
  type: CLEAR_PROJECTS_SEARCH,
});
export const setCurrentProject = (id) => ({
  type: SET_CURRENT_PROJECT,
  payload: id,
});

export const clearCuurentProject = () => ({
  type: CLEAR_CURRENT_PROJECT,
});
