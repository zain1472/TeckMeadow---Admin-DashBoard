import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { clearIsChatActive } from "../../../../actions/ChatActions";
const ChatSideBarNav = ({ isChatActive, clearIsChatActive }) => {
  const chatTab = useRef(null);
  useEffect(() => {
    if (isChatActive === true) {
      chatTab.current.click();
    }
  }, [isChatActive]);
  return (
    <ul className="nav nav-pills" id="pills-tab" role="tablist">
      <li className="nav-item">
        <a
          className="nav-link active"
          id="pills-home-tab"
          data-toggle="pill"
          href="#pills-home"
          role="tab"
          aria-controls="pills-home"
          aria-selected="true"
          ref={chatTab}
        >
          Chats
        </a>
      </li>

      <li className="nav-item" onClick={() => clearIsChatActive()}>
        <a
          className="nav-link"
          id="pills-contact-tab"
          data-toggle="pill"
          href="#pills-contact"
          role="tab"
          aria-controls="pills-contact"
          aria-selected="false"
        >
          Contacts
        </a>
      </li>
    </ul>
  );
};
const mapStateToProps = (state) => ({
  isChatActive: state.chat.isChatActive,
});
export default connect(mapStateToProps, { clearIsChatActive })(ChatSideBarNav);
