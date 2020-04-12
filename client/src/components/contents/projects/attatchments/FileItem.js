import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { downloadFile, deleteFile } from "../../../../actions/FileActions";
const FileItem = ({ file, downloadFile, deleteFile, isAdmin, project }) => {
  return (
    <div>
      <li className="list-group-item d-flex align-items-center pl-0 pr-0">
        <div>
          <figure className="avatar mr-3">
            <span className="avatar-title bg-success-bright text-success rounded">
              <i className="fas fa-file"></i>
            </span>
          </figure>
        </div>
        <div>
          <a href={`localhost:5000/api/files/${file.path}/download`}>
            <h6 className="mb-0 pl-4">{file.filename}</h6>
          </a>
        </div>
        <div className="ml-auto">
          <a
            onClick={() => downloadFile(file.path)}
            href={`localhost:5000/api/files/${file.path}/download`}
            className="text-primary"
            data-toggle="tooltip"
            title="Download"
          >
            <i className="fas fa-download"></i>
          </a>
          {isAdmin && isAdmin === true && (
            <a
              href="#!"
              onClick={() => deleteFile(file, project)}
              className="text-danger ml-2"
              data-toggle="tooltip"
              title="Delete"
            >
              <i className="fas fa-trash"></i>
            </a>
          )}
        </div>
      </li>
    </div>
  );
};

FileItem.propTypes = {
  file: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  isAdmin: state.auth.isAdmin,
  project: state.chat.currentProject,
});
export default connect(mapStateToProps, { downloadFile, deleteFile })(FileItem);
