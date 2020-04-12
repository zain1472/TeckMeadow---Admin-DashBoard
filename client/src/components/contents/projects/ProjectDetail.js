import React, { Fragment } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  setCurrentProject,
  changeProjectStatus,
  deleteProject,
} from "../../../actions/AppActions";
import { setCurrentEmployee } from "../../../actions/ChatActions";
import Attatchments from "./attatchments/Attatchments";
const ProjectDetail = ({
  match,
  currentProject,
  setCurrentProject,
  projects,
  isAdmin,
  changeProjectStatus,
  deleteProject,
  setCurrentEmployee,
}) => {
  useEffect(() => {
    setCurrentProject(match.params.id);
    // eslint-disable-next-line
  }, [projects]);

  return (
    <Fragment>
      {currentProject !== null && (
        <div className="">
          <div className="">
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-lg-8 col-md-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex justify-content-between mb-4">
                          <div className="d-flex">
                            <div>
                              <figure className="avatar mr-3">
                                <img
                                  src={`/uploads/${currentProject.employee.image}`}
                                  className="rounded"
                                  alt="..."
                                />
                              </figure>
                            </div>
                            <div>
                              <h5 className="mt-0">{currentProject.title}</h5>
                              {currentProject.status === "ongoing" && (
                                <span className="badge bg-info-bright text-info">
                                  In Progress
                                </span>
                              )}
                              {currentProject.status === "completed" && (
                                <span className="badge bg-info-bright text-success">
                                  Completed
                                </span>
                              )}
                              {currentProject.status === "submitted" && (
                                <span className="badge bg-info-bright text-success">
                                  Submitted
                                </span>
                              )}
                              {currentProject.status === "cancelled" && (
                                <span className="badge bg-danger-bright text-danger">
                                  Cancelled
                                </span>
                              )}
                              {currentProject.status === "awaitingPayment" && (
                                <span className="badge bg-success-bright text-success">
                                  Awaiting Payment
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <p className="lead">Project Description:</p>
                        <p>{currentProject.description}</p>
                        <p>
                          Project Price:{" "}
                          <span className="text-secondary">
                            {currentProject.price + " "}Rs/-
                          </span>
                        </p>
                        <p></p>

                        <div className="row my-4">
                          <div className="col-md-4">
                            <p className="mb-2">Created:</p>
                            <div className="text-info">
                              {new Date(currentProject.dated).toDateString()}
                            </div>
                          </div>
                          <div className="col-md-4">
                            <p className="mb-2">Deadline:</p>
                            <div className="text-danger">
                              {new Date(currentProject.dueDate).toDateString()}
                            </div>
                          </div>
                          <div className="col-md-4">
                            <p className="mb-2">Completed:</p>
                            <div className="text-success">
                              {currentProject.status === "completed"
                                ? new Date(
                                    currentProject.completionDate
                                  ).toDateString()
                                : "Not there Yet"}
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center my-4">
                          <div className="avatar-group">
                            <figure className="avatar">
                              <Link
                                to={`/`}
                                title={currentProject.employee.username}
                                data-toggle="tooltip"
                                onClick={() =>
                                  setCurrentEmployee(currentProject.employee)
                                }
                              >
                                <img
                                  src={`/uploads/${currentProject.employee.image}`}
                                  className="rounded-circle"
                                  alt="avatar"
                                />
                              </Link>
                            </figure>
                          </div>
                          <div className="ml-2">
                            {currentProject.employee.firstname +
                              " " +
                              currentProject.employee.lastname}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <h6 className="card-title">Actions</h6>
                        </div>
                        <div>
                          {currentProject.status === "awaitingPayment" &&
                            isAdmin === true && (
                              <a
                                href="#!"
                                onClick={() =>
                                  changeProjectStatus(
                                    currentProject,
                                    "completed"
                                  )
                                }
                                className="text-success ml-2"
                                data-toggle="tooltip"
                                title="Mark Payment as Complete"
                              >
                                <i className=" fas fa-money-bill-wave"></i>
                              </a>
                            )}

                          {currentProject.status === "ongoing" && (
                            <Fragment>
                              <a
                                href="#!"
                                onClick={() =>
                                  changeProjectStatus(
                                    currentProject,
                                    `${
                                      isAdmin === true
                                        ? "awaitingPayment"
                                        : "submitted"
                                    }`
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
                                onClick={() =>
                                  changeProjectStatus(
                                    currentProject,
                                    "cancelled"
                                  )
                                }
                                className="text-warning ml-2"
                                data-toggle="tooltip"
                                title="Cancel the Project"
                              >
                                <i className=" fas fa-window-close"></i>
                              </a>
                            </Fragment>
                          )}

                          {currentProject.status === "submitted" && isAdmin && (
                            <Fragment>
                              <a
                                href="#!"
                                onClick={() =>
                                  changeProjectStatus(
                                    currentProject,
                                    `${
                                      isAdmin === true
                                        ? "awaitingPayment"
                                        : "submitted"
                                    }`
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
                                onClick={() =>
                                  changeProjectStatus(
                                    currentProject,
                                    "cancelled"
                                  )
                                }
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
                                to={`/projects/${currentProject._id}/edit`}
                                className="text-secondary ml-2"
                                data-toggle="tooltip"
                                title="Edit"
                              >
                                <i className=" fas fa-pencil-alt"></i>
                              </Link>
                              <Link
                                to="/projects"
                                className="text-danger ml-2"
                                data-toggle="tooltip"
                                title="Delete"
                                onClick={() => deleteProject(currentProject)}
                              >
                                <i className="fas fa-trash"></i>
                              </Link>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <Attatchments project={currentProject} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  currentProject: state.chat.currentProject,
  projects: state.chat.projects,
  isAdmin: state.auth.isAdmin,
});
export default connect(mapStateToProps, {
  setCurrentProject,
  changeProjectStatus,
  deleteProject,
  setCurrentEmployee,
})(ProjectDetail);
