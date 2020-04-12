import React from "react";
import { connect } from "react-redux";
const ChatHeader = ({ currentEmployee }) => {
  return (
    <div className="chat-header border-bottom">
      <div className="d-flex align-items-center">
        {currentEmployee === null ? (
          <h3>Start a conversation</h3>
        ) : (
          <div>
            <div className="pr-3">
              <div className="avatar">
                <img
                  src="/assets/media/image/user/women_avatar1.jpg"
                  className="rounded-circle"
                  alt="ima"
                />
              </div>
            </div>
            <div>
              <p className="mb-0">
                {currentEmployee.firstname + " " + currentEmployee.lastname}
              </p>
              <div className="m-0 small text-success">
                {currentEmployee.isOnline ? "Online" : "Offline"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  currentEmployee: state.chat.currentEmployee
});
export default connect(mapStateToProps)(ChatHeader);
