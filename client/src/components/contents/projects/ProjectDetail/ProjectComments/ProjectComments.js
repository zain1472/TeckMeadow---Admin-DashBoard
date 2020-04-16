import React, { Fragment } from "react";
import AddComment from "./AddComment";

const ProjectComments = () => {
  return (
    <Fragment>
      <hr className="my-4" />
      <p className="lead">Comments:</p>
      <div>
        <div className="media mb-3">
          <figure className="avatar mr-3">
            <img
              src="../../assets/media/image/user/women_avatar4.jpg"
              className="rounded-circle"
              alt="avatar3"
            />
          </figure>
          <div className="media-body">
            <h5 className="mt-0">Lisetta Muehler</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
              corporis cum eaque libero nostrum unde!
            </p>
          </div>
        </div>
      </div>
      <AddComment />
    </Fragment>
  );
};

export default ProjectComments;
