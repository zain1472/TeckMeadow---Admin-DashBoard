import React, { useEffect } from "react";
import { connect } from "react-redux";
import Messages from "./messages/Messages";
import MessageForm from "./messages/MessageForm";
import ChatSideBarNav from "./layout/ChatSideBarNav";
import ChatSearch from "./layout/ChatSearch";
import Footer from "../../layout/Footer";
import Chats from "./layout/chats/Chats";
import Contacts from "./layout/contacts/Contacts";
import ChatHeader from "./layout/ChatHeader";
import { getEmployees } from "../../../actions/AppActions";
const ChatContent = ({ getEmployees }) => {
  useEffect(() => {
    document.body.classList = "chat-app small-navigation boxed-layout";
    getEmployees();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="">
      <div className="">
        <div className="row no-gutters chat-block">
          <div className="col-lg-4 chat-sidebar border-right">
            <div className="chat-sidebar-header">
              <div className="d-flex">
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
                  <p className="mb-0">TeckMeadow</p>
                  <p className="m-0 small text-muted">Administrator</p>
                </div>
              </div>
              <ChatSearch />
              <ChatSideBarNav />
            </div>

            {/* <!-- end::chat list --> */}
            <div className="chat-sidebar-content">
              <div className="tab-content pt-3" id="pills-tabContent">
                <Chats />

                <Contacts />
              </div>
            </div>
            {/* <!-- end::chat list --> */}
          </div>

          <div className="col-lg-8 chat-content">
            <ChatHeader />

            <Messages />

            <MessageForm />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default connect(null, { getEmployees })(ChatContent);
