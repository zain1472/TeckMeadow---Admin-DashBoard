import React, { useEffect } from "react";
import Projects from "./Projects";
import { connect } from "react-redux";
import {
  clearProjectCategory,
  categorizeProjects,
} from "../../../actions/AppActions";
import SearchBar from "./SearchBar";
const ProjectsContent = ({ categorizeProjects, clearProjectCategory }) => {
  useEffect(() => {
    document.body.classList = "small-navigation boxed-layout";
  }, []);
  return (
    <div className="">
      <div className="">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <ul
                  className="nav nav-pills flex-column flex-sm-row"
                  id="projectTab"
                  role="tablist"
                >
                  <li className="flex-sm-fill text-sm-center nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-selected="true"
                      onClick={() => clearProjectCategory()}
                    >
                      All Projects
                    </a>
                  </li>

                  <li className="flex-sm-fill text-sm-center nav-item">
                    <a
                      className="nav-link"
                      id="completed-tab"
                      data-toggle="tab"
                      href="#completed"
                      role="tab"
                      aria-selected="false"
                      onClick={() => categorizeProjects("completed")}
                    >
                      Completed Projects
                    </a>
                  </li>
                  <li className="flex-sm-fill text-sm-center nav-item">
                    <a
                      className="nav-link"
                      id="completed-tab"
                      data-toggle="tab"
                      href="#ongoing"
                      role="tab"
                      aria-selected="false"
                      onClick={() => categorizeProjects("ongoing")}
                    >
                      Ongoing Projects
                    </a>
                  </li>
                  <li className="flex-sm-fill text-sm-center nav-item">
                    <a
                      className="nav-link"
                      id="awaitingPayment-tab"
                      data-toggle="tab"
                      href="#awaitingPayment"
                      role="tab"
                      aria-selected="false"
                      onClick={() => categorizeProjects("awaitingPayment")}
                    >
                      Projects Awaiting Payment
                    </a>
                  </li>
                  <li className="flex-sm-fill text-sm-center nav-item">
                    <a
                      className="nav-link"
                      id="submitted-tab"
                      data-toggle="tab"
                      href="#submitted"
                      role="tab"
                      aria-selected="false"
                      onClick={() => categorizeProjects("submitted")}
                    >
                      Submitted Projects
                    </a>
                  </li>
                  <li className="flex-sm-fill text-sm-center nav-item">
                    <a
                      className="nav-link"
                      id="cancelled-tab"
                      data-toggle="tab"
                      href="#cancelled"
                      role="tab"
                      onClick={() => categorizeProjects("cancelled")}
                      aria-selected="false"
                    >
                      Cancelled Projects
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <SearchBar />
                <div className="table-responsive">
                  <table id="project-list" className="table table-lg">
                    <thead>
                      <tr>
                        <th>Project Title</th>
                        <th className="text-center">Payment</th>
                        <th className="text-center">Employee</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Started Date</th>
                        <th className="text-center">Due Date</th>
                        <th className="text-center">Completion Date</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <Projects />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { clearProjectCategory, categorizeProjects })(
  ProjectsContent
);
