import React from "react";
import PropTypes from "prop-types";
const MessageItem = ({ message }) => {
  return (
    <div className={`message-item ${message.sender === "admin" && "me"}`}>
      <div className={`message-item-content`}>{message.message}</div>
      <span className="time small text-muted font-italic">
        {new Date(message.dated).toDateString()}
      </span>
    </div>
  );
};
MessageItem.propTypes = {
  message: PropTypes.object.isRequired,
};
export default MessageItem;
