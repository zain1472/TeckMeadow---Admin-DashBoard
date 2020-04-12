import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setCurrentProject, editProject } from "../../../../actions/AppActions";
const EditProject = ({
  match,
  currentProject,
  setCurrentProject,
  history,
  projects,
  editProject,
}) => {
  const [project, setProject] = useState({
    title: "",
    description: "",
    dueDate: "",
    price: 0,
  });
  useEffect(() => {
    setCurrentProject(match.params.id);
    if (currentProject !== null) {
      var date = new Date(currentProject.dueDate);
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();

      if (day < 10) {
        day = "0" + day.toString();
      }

      if (month < 10) {
        month = "0" + month.toString();
      }
      year = year.toString();

      setProject({
        _id: currentProject._id,
        title: currentProject.title,
        description: currentProject.description,
        price: currentProject.price,
        dueDate: year + "-" + month + "-" + day,
        employee: currentProject.employee,
      });
    }
    // eslint-disable-next-line
  }, [projects, currentProject]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(project);
    editProject(project);

    history.push("/projects/" + currentProject._id);
  };
  const onChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };
  const { title, description, dueDate, price } = project;
  return (
    <div class="row">
      {currentProject !== null && (
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title">Edit Project: {currentProject.title}</h6>

              <div>
                <form onSubmit={onSubmit}>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Project title"
                      name="title"
                      value={title}
                      onChange={(e) => onChange(e)}
                      required
                      autofocus
                    />
                  </div>
                  <div class="form-group">
                    <textarea
                      rows="2"
                      name="description"
                      class="form-control"
                      placeholder="Project Description"
                      value={description}
                      onChange={(e) => onChange(e)}
                    >
                      {project.description}
                    </textarea>
                  </div>

                  <div class="form-group">
                    <input
                      type="date"
                      class="form-control"
                      placeholder="Project title"
                      name="dueDate"
                      id="date"
                      value={dueDate}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder=""
                      name="employee"
                      value={project.employee && project.employee._id}
                      required
                      readOnly
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="number"
                      class="form-control"
                      placeholder="price of project"
                      name="price"
                      value={price}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>

                  <div class="text-right">
                    <ul class="list-inline">
                      <li class="list-inline-item">
                        <button class="btn btn-primary">Submit</button>
                      </li>
                    </ul>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  currentProject: state.chat.currentProject,
  projects: state.chat.projects,
});
export default connect(mapStateToProps, { setCurrentProject, editProject })(
  EditProject
);
