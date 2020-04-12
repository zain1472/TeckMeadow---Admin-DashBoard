import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteProject,
  changeProjectStatus,
} from "../../../actions/AppActions";
import { setCurrentEmployee } from "../../../actions/ChatActions";
const ProjectItem = ({
  project,
  deleteProject,
  changeProjectStatus,
  isAdmin,
  setCurrentEmployee,
}) => {
  const {
    _id,
    title,
    employee,
    dated,
    dueDate,
    completionDate,
    status,
    price,
  } = project;

  let DueDate = new Date(dueDate);
  let Dated = new Date(dated);
  return (
    <tr>
      <td>
        <Link to={`/projects/${_id}`}>{title}</Link>
      </td>
      <td className="text-center">{price}&nbsp;Rs/-</td>
      <td className="text-center">
        <div className="avatar-group">
          <figure className="avatar avatar-sm">
            <Link
              to={`/`}
              title={employee.username}
              data-toggle="tooltip"
              onClick={() => setCurrentEmployee(employee)}
            >
              <img
                src={`/uploads/${employee.image}`}
                className="rounded-circle"
                alt="avatar"
              />
            </Link>
          </figure>
        </div>
      </td>
      <td className="text-center">
        {status === "ongoing" && (
          <span className="badge bg-info-bright text-info">In Progress</span>
        )}
        {status === "completed" && (
          <span className="badge bg-info-bright text-success">Completed</span>
        )}
        {status === "submitted" && (
          <span className="badge bg-info-bright text-success">Submitted</span>
        )}
        {status === "cancelled" && (
          <span className="badge bg-danger-bright text-danger">Cancelled</span>
        )}
        {status === "awaitingPayment" && (
          <span className="badge bg-success-bright text-success">
            Awaiting Payment
          </span>
        )}
      </td>
      <td className="text-info">{Dated.toDateString()}</td>
      <td className="text-danger">{DueDate.toDateString()}</td>

      {status === "completed" ? (
        <td className="text-success">
          {new Date(completionDate).toDateString()}
        </td>
      ) : (
        <td className="text-light">Not declared yet</td>
      )}

      <td>
        {status === "awaitingPayment" && isAdmin === true && (
          <a
            href="#!"
            onClick={() => changeProjectStatus(project, "completed")}
            className="text-success ml-2"
            data-toggle="tooltip"
            title="Mark Payment as Complete"
          >
            <i className=" fas fa-money-bill-wave"></i>
          </a>
        )}

        {status === "ongoing" && (
          <Fragment>
            <a
              href="#!"
              onClick={() =>
                changeProjectStatus(
                  project,
                  `${isAdmin === true ? "awaitingPayment" : "submitted"}`
                )
              }
              className="text-success ml-2"
              data-toggle="tooltip"
              title={`Mark Project as ${
                isAdmin === true ? "Finished" : "Submitted"
              }`}
            >
              <i className=" fas fa-check"></i>
            </a>
            <a
              href="#!"
              onClick={() => changeProjectStatus(project, "cancelled")}
              className="text-warning ml-2"
              data-toggle="tooltip"
              title="Cancel the Project"
            >
              <i className=" fas fa-window-close"></i>
            </a>
          </Fragment>
        )}

        {isAdmin === true && (
          <>
            <Link
              to={`/projects/${project._id}/edit`}
              className="text-secondary ml-2"
              data-toggle="tooltip"
              title="Edit"
            >
              <i className=" fas fa-pencil-alt"></i>
            </Link>
            <a
              href="#!"
              className="text-danger ml-2"
              data-toggle="tooltip"
              title="Delete"
              onClick={() => deleteProject(project)}
            >
              <i className="fas fa-trash"></i>
            </a>
          </>
        )}
      </td>
    </tr>
  );
};
const mapStateToProps = (state) => ({
  isAdmin: state.auth.isAdmin,
});
export default connect(mapStateToProps, {
  deleteProject,
  changeProjectStatus,
  setCurrentEmployee,
})(ProjectItem);
