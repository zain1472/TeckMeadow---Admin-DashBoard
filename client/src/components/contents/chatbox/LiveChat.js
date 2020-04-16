import React, { useState } from "react";
import Messages from "./Messages";
import { connect } from "react-redux";
import { clearHaveUnreadMessages } from "../../../actions/ChatActions";
const LiveChat = ({ currentUser, clearHaveUnreadMessages }) => {
  const [active, setActive] = useState(false);
  return (
    <div className={`tb-toggle-chat-wrap ${active && "tb-active"}`}>
      <div className="tb-live-chat-wrap tb-active">
        <div className="tb-live-chat-heading">
          <div className="tb-live-chat-user">
            <div className="tb-live-chat-user-img">
              <img src="assets/img/weebfy-logo.png" alt="" />
            </div>
            <div className="tb-live-chat-user-info">
              <h2 className="tb-live-chat-user-name">Support Ninjas</h2>
              <div className="tb-live-chat-user-text">
                welcome to live chat...
              </div>
            </div>
          </div>
        </div>
        <div className="tb-live-chat-body">
          <div className="tb-chat-conversation tb-live-chat tb-style2">
            <Messages />
          </div>
          {/* <!-- .tb-chat-conversation --> */}
        </div>
        {/* <!-- .tb-live-chat-body --> */}
      </div>
      {/* <!-- .tb-live-chat-wrap --> */}
      <div
        href="#!"
        className={`tb-toggle-chat-btn ${
          currentUser !== null &&
          currentUser.haveUnreadMessages === true &&
          "pulse"
        }`}
        onClick={() => {
          setActive(!active);
          clearHaveUnreadMessages(currentUser);
          console.log("object");
        }}
      >
        <i className="fas fa-comment-alt"></i>
        <i className="fas fa-times"></i>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.user,
});
export default connect(mapStateToProps, { clearHaveUnreadMessages })(LiveChat);
