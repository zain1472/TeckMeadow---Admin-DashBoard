import { setAlert } from "./AlertActions";
import axios from "axios";
import { DELETE_FILE } from "./types";
// Download File
export const downloadFile = (fileId) => async (dispatch) => {
  dispatch(setAlert("Attempting to download a file", "info"));
  try {
    axios({
      url: `/api/files/${fileId}/download`,
      method: "GET",
      responseType: "blob", // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileId);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
    dispatch(setAlert("Successfully downloaded the file", "success"));
  } catch (error) {
    dispatch(setAlert("Cannot download the file", "danger"));
  }
};

// Download File
export const deleteFile = (file, project) => async (dispatch) => {
  dispatch(setAlert("Attempting to delete a file", "warning"));
  try {
    await axios.get(
      `/api/files/${file.path}/delete/${project._id}/${file.filename}/${file._id}`
    );
    dispatch({
      type: DELETE_FILE,
      payload: file,
    });
    dispatch(setAlert("Successfully deleted the file", "success"));
  } catch (error) {
    dispatch(setAlert("Cannot delete the file", "danger"));
  }
};
