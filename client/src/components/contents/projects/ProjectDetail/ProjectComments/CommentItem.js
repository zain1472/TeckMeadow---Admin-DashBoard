import React from "react";
import { deleteComment } from "../../../../../actions/CommentActions";
import { connect } from "react-redux";
const CommentItem = ({ comment, deleteComment, currentProject }) => {
  return (
    <div className="media mb-3">
      <figure className="avatar mr-3">
        <img
          src={`/uploads/${comment.author.image}`}
          className="rounded-circle"
          alt="avatar3"
        />
      </figure>
      <div className="media-body">
        <h5 className="mt-0">
          {comment.author.firstname + " " + comment.author.lastname}
        </h5>
        <div className="d-flex">
          <p style={{ display: "inline-block" }}>
            {comment.description}{" "}
            <a href="#!" onClick={() => deleteComment(comment, currentProject)}>
              <i className="fas fa-trash text-danger show-hide-toggler"></i>
            </a>
          </p>
          <span
            className="text-muted ml-auto"
            // style={{ display: "inline-block" }}
          >
            {new Date(comment.dated).toDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  currentProject: state.chat.currentProject,
});
export default connect(mapStateToProps, { deleteComment })(CommentItem);
