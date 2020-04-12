import React, { useEffect, useState } from "react";
import socketIoClient from "socket.io-client";
const Chat = () => {
  const [connection, setConnection] = useState(false);
  useEffect(() => {
    const socket = socketIoClient("http://localhost:5000");
    socket.on("connect", function() {
      console.log("object");
      setConnection(true);
      socket.on("disconnect", function() {
        console.log("disconnect");
        setConnection(false);
      });
    });
  }, []);
  return <div>{connection ? "true" : "false"}</div>;
};

export default Chat;
