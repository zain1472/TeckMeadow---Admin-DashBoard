import React from "react";
import { connect } from "react-redux";
import { searchEmployees, clearSearch } from "../../../../actions/ChatActions";
const ChatSearch = ({ searchEmployees, clearSearch }) => {
  const search = (e) => {
    if (e.target.value === "") {
      clearSearch();
    } else {
      searchEmployees(e.target.value);
    }
  };
  return (
    <form>
      <div className="input-group">
        <input
          type="text"
          onChange={(e) => search(e)}
          className="form-control"
          placeholder="Search..."
        />
      </div>
    </form>
  );
};

export default connect(null, { searchEmployees, clearSearch })(ChatSearch);
