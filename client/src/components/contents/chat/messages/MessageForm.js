import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import socketIoClient from "socket.io-client";
import { addMessage } from "../../../../actions/ChatActions";
const MessageForm = ({ addMessage, currentEmployee, currentUser }) => {
  const [text, setText] = useState("");
  const [connection, setConnection] = useState(false);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    if (currentUser !== null) {
      const socket = socketIoClient("http://localhost:5000");
      setSocket(socket);
      socket.on("connect", function () {
        setConnection(true);
        socket.emit("new-user", {
          userId: currentUser._id,
          name: "admin",
        });
        socket.on("message", (data) => {
          addMessage(data);
        });
        socket.on("disconnect", function () {
          console.log("disconnect");
          setConnection(false);
        });
      });
    }
  }, [currentUser]);
  const onSubmit = (e) => {
    e.preventDefault();

    if (text !== "") {
      let date = new Date(Date.now());
      addMessage({
        id: currentEmployee._id,
        message: text,
        sender: "admin",
        reciever: "ali",
        dated: date,
      });
      socket.emit("message", {
        id: currentEmployee._id,
        sender: "admin",
        reciever: currentEmployee.email,
        message: text,
      });
    }
    setText("");
  };
  return (
    <div className="chat-footer border-top">
      <form className="d-flex" onSubmit={onSubmit}>
        <div className="flex-grow-1">
          <input
            type="text"
            value={text}
            className="form-control"
            placeholder="Write your message"
            required
            onChange={(e) => setText(e.target.value)}
            disabled={currentEmployee === null || connection !== true}
          />
        </div>
        <div className="chat-footer-buttons d-flex">
          {connection === true && (
            <button className="btn btn-primary" type="submit">
              <i className="mb-2 mr-2 material-icons width-15 height-15">
                send
              </i>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
const mapStatetoProps = (state) => ({
  currentEmployee: state.chat.currentEmployee,
  currentUser: state.auth.user,
});
export default connect(mapStatetoProps, { addMessage })(MessageForm);
