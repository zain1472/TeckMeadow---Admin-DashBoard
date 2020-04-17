import React, { useState } from "react";
import { connect } from "react-redux";
import { addComment } from "../../../../../actions/CommentActions";
const AddComment = ({ currentProject, addComment }) => {
  const [text, setText] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    setText("");
    addComment({ description: text }, currentProject);
  };
  return (
    <div className="form-wrapper col-md-6">
      <form onSubmit={onSubmit}>
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            name=""
            id=""
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-primary">Add Comment</button>
          </div>
        </div>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => ({
  currentProject: state.chat.currentProject,
});
export default connect(mapStateToProps, { addComment })(AddComment);
