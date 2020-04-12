import React, { useState, useEffect, useRef, Fragment } from "react";
import { connect } from "react-redux";
import socketIoClient from "socket.io-client";
import MessageItem from "./MessageItem";
const Messages = ({ currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [connection, setConnection] = useState(false);
  const [text, setText] = useState("");
  const messagesBottomRef = useRef(null);
  useEffect(() => {
    if (currentUser !== null) {
      setMessages(currentUser.messages);
    }
  }, [currentUser]);
  useEffect(() => {
    if (messages.length !== 0) {
      console.log(messages);
      messagesBottomRef.current.scrollIntoView();
      const socket = socketIoClient("http://localhost:5000");
      setSocket(socket);
      console.log("setted");
      socket.on("connect", function () {
        setConnection(true);
        if (currentUser !== null) {
          socket.emit("new-user", {
            userId: currentUser._id,
            name: currentUser.email,
          });
        }
        socket.on("message", function (data) {
          setMessages([...messages, data]);
          messagesBottomRef.current.scrollIntoView();
        });
        socket.on("disconnect", function () {
          console.log("disconnect");
          setConnection(false);
        });
      });
    }
  }, [messages]);
  const onSubmit = (e) => {
    e.preventDefault();
    const message = {
      sender: currentUser.email,
      reciever: "admin",
      message: text,
      id: currentUser._id,
      dated: Date(Date.now()),
    };
    socket.emit("message", message);
    setMessages([...messages, message]);
    setText("");
  };
  const onChange = (e) => {
    setText(e.target.value);
    console.log(text);
  };
  return (
    <Fragment>
      <ul className="tb-reverse-scroll tb-conversation-list">
        {messages.map((message) => (
          <MessageItem key={message._id} message={message} />
        ))}
        <li ref={messagesBottomRef}></li>
      </ul>
      <div className="tb-conversion-input">
        <form onSubmit={(e) => onSubmit(e)} style={{ width: "100%" }}>
          <div className="tb-custom-input-area">
            <input
              className="tb-custom-input-field tb-chat-input"
              type="text"
              value={text}
              onChange={(e) => onChange(e)}
              placeholder="Add your message..."
              required
              style={{ border: "none", display: "inline-block" }}
            ></input>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.user,
});
export default connect(mapStateToProps)(Messages);
