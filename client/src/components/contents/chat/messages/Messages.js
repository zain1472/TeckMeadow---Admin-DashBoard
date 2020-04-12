import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import MessageItem from "./MessageItem";

const Messages = ({ chat: { loading, employees }, currentEmployee }) => {
  const [messages, setMessages] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(scrollToBottom, [messages]);
  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 200);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    console.log("use");
    if (currentEmployee !== null) {
      setMessages(currentEmployee.messages);
    }
  }, [currentEmployee, employees]);

  return (
    <div className="messages">
      {!loading &&
        messages !== null &&
        messages.map((message, key) => (
          <MessageItem key={key} message={message} />
        ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  chat: state.chat,
  currentEmployee: state.chat.currentEmployee,
});
export default connect(mapStateToProps)(Messages);
