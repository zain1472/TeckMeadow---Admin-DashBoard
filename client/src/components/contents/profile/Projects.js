import React from "react";
import { connect } from "react-redux";
// ProjectItem
import ProjectItem from "./ProjectItem";
const Projects = ({ projects, currentEmployee }) => {
  let total = 0;
  return (
    <div className="tab-pane fade" id="earnings" role="tabpanel">
      <div className="card">
        <div className="card-body">
          <h6 className="card-title mb-0">Payments</h6>
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="thead-light">
              <tr>
                <th>Payment Title</th>
                <th>Payment Date</th>
                <th>Payment Amount</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployee === null
                ? projects.map((project) => {
                    if (project.status === "completed") {
                      total += project.price;
                    }
                    return <ProjectItem key={project._id} project={project} />;
                  })
                : currentEmployee.projects.map((project) => {
                    if (project.status === "completed") {
                      total += project.price;
                    }
                    return <ProjectItem key={project._id} project={project} />;
                  })}
            </tbody>
            <tfoot>
              <tr>
                <th></th>
                <th>Total Payments</th>
                <th>{total + " "} RS/-</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.user,
  projects: state.chat.projects,
  currentEmployee: state.chat.currentEmployee,
});
export default connect(mapStateToProps)(Projects);
