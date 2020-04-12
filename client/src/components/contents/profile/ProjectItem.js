import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProjectItem = ({ project }) => {
  return (
    <Fragment>
      {project.status === "completed" && (
        <tr>
          <td>
            <Link to={`/projects/${project._id}`}>{project.title}</Link>
          </td>
          <td className="text-success">
            {new Date(project.completionDate).toDateString()}
          </td>
          <td className="text-secondary">{project.price} Rs/-</td>
        </tr>
      )}
    </Fragment>
  );
};

ProjectItem.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectItem;
