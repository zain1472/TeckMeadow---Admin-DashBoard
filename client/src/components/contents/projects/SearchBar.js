import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  searchProjects,
  clearProjectsSearch,
} from "../../../actions/AppActions";
const EmployeeSearch = ({ searchProjects, clearProjectsSearch, projects }) => {
  const [text, setText] = useState("");
  useEffect(() => {
    search();
    // eslint-disable-next-line
  }, [projects]);
  const search = (e) => {
    if (e) {
      setText(e.target.value);
    }
    if (text === "") {
      clearProjectsSearch();
    } else {
      searchProjects(text);
    }
  };
  return (
    <form>
      <div className="input-group">
        <input
          type="text"
          value={text}
          onChange={(e) => search(e)}
          className="form-control"
          placeholder="Search..."
        />
      </div>
    </form>
  );
};
const mapStateToProps = (state) => ({
  projects: state.chat.projects,
});
export default connect(mapStateToProps, {
  searchProjects,
  clearProjectsSearch,
})(EmployeeSearch);
