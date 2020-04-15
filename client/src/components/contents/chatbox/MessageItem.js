import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

const MessageItem = ({ message }) => {
  const [show, setShow] = useState(false);
  return (
    <Fragment>
      <li
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className={`${message.sender === "admin" && "tb-another-side"}`}
      >
        <div className="tb-conversation-text">
          <div>
            <p>{message.message}</p>
          </div>
        </div>
        <br />
      </li>
      {show === true && (
        <li className={`${message.sender === "admin" && "tb-another-side"}`}>
          <p className="text-muted" style={{ backgroundColor: "white" }}>
            {new Date(message.dated).toDateString()}
          </p>
        </li>
      )}
    </Fragment>
  );
};

MessageItem.propTypes = {
  message: PropTypes.object.isRequired,
};

export default MessageItem;
