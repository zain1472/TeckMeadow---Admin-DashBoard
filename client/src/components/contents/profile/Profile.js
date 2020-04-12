import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
// Tab - Contents
import Permissions from "../profile/Permissions";
import Projects from "../profile/Projects";
import AssignProject from "../profile/AssignProject";
const Profile = ({ currentUser, projects, currentEmployee }) => {
  const permission = useRef(null);
  useEffect(() => {
    if (currentEmployee !== null) {
      setUser(currentEmployee);
    } else {
      setUser(currentUser);
    }
  }, [currentUser, currentEmployee]);
  const [user, setUser] = useState(null);
  return (
    <div className="">
      <div className="">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-4">
                <div className="card">
                  <img
                    src="/assets/media/image/image1.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body text-center m-t-70-minus">
                    <figure className="avatar avatar-xl m-b-20">
                      <img
                        src={`/uploads/${user !== null && user.image}`}
                        className="rounded-circle"
                        alt="..."
                      />
                    </figure>
                    <h5>
                      {user !== null && user.firstname + " " + user.lastname}
                    </h5>
                    <p className="text-muted">
                      {user !== null && user.country}
                    </p>
                  </div>
                  <hr className="m-0" />
                  <div className="card-body">
                    <div className="row text-center">
                      <div className="col-12 text-success">
                        <h4 className="font-weight-bold">{projects.length}</h4>
                        <span>Total Payments</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="card">
                  <div className="card-body">
                    <ul
                      className="nav nav-pills flex-column flex-sm-row"
                      id="myTab"
                      role="tablist"
                    >
                      {currentEmployee !== null && (
                        <li class="flex-sm-fill text-sm-center nav-item">
                          <a
                            class="nav-link"
                            id="connections-tab1"
                            data-toggle="tab"
                            href="#connections"
                            role="tab"
                            aria-selected="false"
                          >
                            Assign Project
                          </a>
                        </li>
                      )}
                      <li className="flex-sm-fill text-sm-center nav-item">
                        <a
                          className="nav-link active"
                          id="home-tab"
                          data-toggle="tab"
                          href="#home"
                          role="tab"
                          aria-selected="true"
                          ref={permission}
                        >
                          Permissions
                        </a>
                      </li>

                      <li className="flex-sm-fill text-sm-center nav-item">
                        <a
                          className="nav-link"
                          id="earnings-tab"
                          data-toggle="tab"
                          href="#earnings"
                          role="tab"
                          aria-selected="false"
                        >
                          Payments
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="tab-content" id="myTabContent">
                  {currentEmployee !== null && <AssignProject />}
                  <Permissions />
                  <Projects />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  currentUser: state.auth.user,
  projects: state.app.projects,
  currentEmployee: state.chat.currentEmployee,
});
export default connect(mapStateToProps)(Profile);
