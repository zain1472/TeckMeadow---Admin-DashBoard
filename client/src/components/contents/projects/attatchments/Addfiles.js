import React, { useState } from "react";
import { connect } from "react-redux";
import ProgressBar from "../../../layout/ProgressBar";
import { addFiles } from "../../../../actions/AppActions";
const Addfiles = ({ uploadProgress, addFiles, project }) => {
  const [files, setFiles] = useState(null);
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(files);
    addFiles(project, files);
  };
  return (
    <div>
      {uploadProgress === null && project.status === "ongoing" && (
        <form id="submit" onSubmit={(e) => onSubmit(e)} className="mt-3">
          <div className="input-group">
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="customFile"
                name="files"
                onChange={(e) => {
                  setFiles(e.target.files);
                }}
                required
                multiple
              />
              <label className="custom-file-label" htmlFor="customFile">
                Add
              </label>
            </div>

            <div className="input-group-append" id="">
              <button
                className="btn btn-primary"
                type="submit"
                id="button-addon1"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      )}

      <ProgressBar />
    </div>
  );
};
const mapStateToProps = (state) => ({
  uploadProgress: state.chat.uploadProgress,
  project: state.chat.currentProject,
});
export default connect(mapStateToProps, { addFiles })(Addfiles);
