import React, { useEffect } from "react";
import Files from "./Files";
import Addfiles from "./Addfiles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearUploadProgress } from "../../../../actions/AppActions";
const Attatchments = ({ project, clearUploadProgress }) => {
  useEffect(() => {
    clearUploadProgress();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="card">
      <div className="card-body">
        <h6 className="card-title">Attachments</h6>
        <div className="">
          <Files files={project.files} />
        </div>
        <Addfiles project={project} />
      </div>
    </div>
  );
};
Attatchments.propTypes = {
  project: PropTypes.object.isRequired,
};
export default connect(null, { clearUploadProgress })(Attatchments);
