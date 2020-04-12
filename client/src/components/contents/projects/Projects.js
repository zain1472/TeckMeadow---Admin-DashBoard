import React, { Fragment } from "react";
import { connect } from "react-redux";
import ProjectItem from "./ProjectItem";
const Projects = ({ projects, filteredProjects, categorizedProjects }) => {
  if (filteredProjects != null) {
    return (
      <Fragment>
        {filteredProjects.length === 0 ? (
          <tr>No projects to show</tr>
        ) : (
          <tr>Search Results</tr>
        )}
        {filteredProjects.reverse().map((project) => (
          <ProjectItem key={project._id} project={project} />
        ))}
      </Fragment>
    );
  }
  if (categorizedProjects !== null) {
    return (
      <Fragment>
        {categorizedProjects.length === 0 && (
          <tr className="ml-2 mt-2 ">No projects to show</tr>
        )}
        {categorizedProjects.reverse().map((project) => (
          <ProjectItem key={project._id} project={project} />
        ))}
      </Fragment>
    );
  }
  return (
    <Fragment>
      {projects.reverse().map((project) => (
        <ProjectItem key={project._id} project={project} />
      ))}
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  projects: state.chat.projects,
  categorizedProjects: state.chat.categorizedProjects,
  filteredProjects: state.chat.filteredProjects,
});
export default connect(mapStateToProps)(Projects);
