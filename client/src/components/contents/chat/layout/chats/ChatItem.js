import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  setCurrentEmployee,
  clearCount,
} from "../../../../../actions/ChatActions";
const ChatItem = ({
  employee,
  setCurrentEmployee,
  currentEmployee,
  clearCount,
}) => {
  let isChatActive = false;
  let message = "",
    dated = "";
  if (currentEmployee !== null) {
    currentEmployee._id === employee._id
      ? (isChatActive = true)
      : (isChatActive = false);
  }
  if (employee.messages.length > 0 || isChatActive) {
    const title = employee.firstname + " " + employee.lastname;
    if (employee.messages.length > 0) {
      message = employee.messages[employee.messages.length - 1];
      dated = employee.messages[employee.messages.length - 1].dated;
    }

    const { count } = employee;
    return (
      <a
        href="#!"
        className={`list-group-item d-flex align-items-center ${
          isChatActive ? "active" : ""
        }`}
        onClick={() => {
          clearCount(employee);
        }}
      >
        <div className="pr-3">
          <div className="avatar ">
            <span className="avatar-title bg-success rounded-circle">
              {title.charAt(0)}
            </span>
          </div>
        </div>
        <div>
          <h6 className="mb-1">{title}</h6>
          <span className="small text-muted">{message.message}</span>
        </div>
        <div className="text-right ml-auto">
          <span className="badge badge-primary badge-pill ml-auto mr-2">
            {count > 0 && count}
          </span>
          <span className="small text-muted ml-3">
            {dated && new Date(dated).toDateString()}
          </span>
        </div>
      </a>
    );
  } else {
    return <Fragment />;
  }
};
const mapStateToProps = (state) => ({
  currentEmployee: state.chat.currentEmployee,
});
export default connect(mapStateToProps, { setCurrentEmployee, clearCount })(
  ChatItem
);
