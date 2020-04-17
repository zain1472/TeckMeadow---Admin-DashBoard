import React, { Fragment } from "react";
import AddComment from "./AddComment";
import { connect } from "react-redux";
import CommentItem from "./CommentItem";
const ProjectComments = ({ currentProject }) => {
  return (
    <Fragment>
      <hr className="my-4" />
      <p className="lead">Comments:</p>
      <div>
        {currentProject !== null &&
          currentProject.comments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} />
          ))}
      </div>
      <AddComment />
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  currentProject: state.chat.currentProject,
});
export default connect(mapStateToProps)(ProjectComments);
