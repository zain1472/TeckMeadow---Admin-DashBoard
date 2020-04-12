import React from "react";
import PropTypes from "prop-types";
import FileItem from "./FileItem";

const Files = ({ files }) => {
  return (
    <ul className="list-group list-group-flush">
      {files.map((file) => (
        <FileItem key={file._id} file={file} />
      ))}
    </ul>
  );
};
Files.propTypes = {
  files: PropTypes.array.isRequired,
};
export default Files;
