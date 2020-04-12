import React, { useState, useEffect } from "react";
import Messages from "./Messages";
const LiveChat = () => {
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
        className="tb-toggle-chat-btn nav-link-notify"
        onClick={() => setActive(!active)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-message-circle"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      </div>
    </div>
  );
};

export default LiveChat;
