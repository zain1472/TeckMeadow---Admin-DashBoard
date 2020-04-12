import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  assignProject,
  clearUploadProgress,
} from "../../../actions/AppActions";
import ProgressBar from "../../layout/ProgressBar";
const AssignProject = ({
  currentEmployee,
  assignProject,
  uploadProgress,
  clearUploadProgress,
}) => {
  useEffect(() => {
    clearUploadProgress();
    // eslint-disable-next-line
  }, []);

  const [project, setProject] = useState({
    title: "",
    description: "",
    dueDate: Date(),
    employee: currentEmployee._id,
    files: [],
    price: 0,
  });
  const onChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(project);
    assignProject(project);
  };
  const { title, description, dueDate, employee, price } = project;
  return (
    <div className="tab-pane fade" id="connections" role="tabpanel">
      <div className="card">
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Project title"
                name="title"
                required
                autocomplete="off"
                autoFocus
                value={title}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group">
              <textarea
                rows="2"
                name="description"
                className="form-control"
                placeholder="Project Description"
                value={description}
                onChange={(e) => onChange(e)}
              >
                {title}
              </textarea>
            </div>
            <div className="form-group">
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="customFile"
                  name="files"
                  multiple
                  onChange={(e) => {
                    console.log(e.target.files);
                    setProject({
                      ...project,
                      files: e.target.files,
                    });
                  }}
                />
                <label className="custom-file-label" for="customFile">
                  Upload Files
                </label>
              </div>
            </div>
            <div className="form-group">
              <input
                type="date"
                className="form-control"
                placeholder="Project title"
                name="dueDate"
                value={dueDate}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder=""
                name="employee"
                value={employee}
                required
                readOnly
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                placeholder="price of project"
                name="price"
                value={price}
                onChange={(e) => onChange(e)}
                required
              />
            </div>

            <div className="text-right">
              <ul className="list-inline">
                <li className="list-inline-item">
                  {uploadProgress === null && (
                    <button id="submit" className="btn btn-primary">
                      Submit
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </form>
          <ProgressBar />
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  currentEmployee: state.chat.currentEmployee,
  uploadProgress: state.chat.uploadProgress,
});
export default connect(mapStateToProps, { assignProject, clearUploadProgress })(
  AssignProject
);
