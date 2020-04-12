import React from "react";
import { connect } from "react-redux";
import { clearUploadProgress } from "../../actions/AppActions";
const ProgressBar = ({ uploadProgress, clearUploadProgress }) => {
  return (
    <div>
      {uploadProgress !== null && (
        <div className="row">
          <div className="col-12">
            <h3>Processing</h3>
          </div>
          <div className="col-11">
            <div class="progress">
              <div
                class="progress-bar bg-info"
                role="progressbar"
                style={{ width: uploadProgress + "%" }}
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          <div className="col-1">
            <a href="#!" onClick={() => clearUploadProgress()}>
              <i class="far fa-window-close text-primary"></i>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  uploadProgress: state.chat.uploadProgress,
});
export default connect(mapStateToProps, { clearUploadProgress })(ProgressBar);
