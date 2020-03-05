var socket = io("http://localhost:3000/");
var currentUser;
socket.emit("new-user", {
        name: currentUser.username,
        id: socket.id,
        userId: currentUser._id
      });
function add() {
  socket.on("message", data => {
    console.log(data);
    appendMessage(data.message, false);
  });
  var sender, reciever;
  if (currentUser) {
    if (currentUser.isAdmin) {
      sender = "admin";
      reciever = user.username;
      id = user._id;
    } else {
      reciever = "wela";
      sender = currentUser.username;
      id = currentUser._id;
    }
  }
  var messages = document.getElementById("messages");
  var form = document.getElementById("message-form");
  form.addEventListener("submit", e => {
    e.preventDefault();
    var msg = document.getElementById("m");
    socket.emit("message", {
      sender: sender,
      reciever: reciever,
      message: msg.value,
      id: id
    });

    appendMessage(msg.value, true);
    msg.value = "";
  });
}
function appendMessage(message, me) {
  var newMessage = document.createElement("div");
  newMessage.className = "message-item";
  var messageContent = document.createElement("div");
  messageContent.className = "message-item-content";
  if (me) {
    newMessage.className += " me";
  }
  // newMessage.firstChild.className = "message-item-content";
  messageContent.innerText = message;
  var time = document.createElement("span");
  time.className = "time small text-muted font-italic";
  time.innerText = "Just Now";

  newMessage.append(messageContent);
  newMessage.append(time);

  document.getElementById("messages").append(newMessage);

  // document.getElementById("messages").append(newMessage);
  // $("#messages").animate(
  //   {
  //     scrollTop: $(".message-content")
  //       .last()
  //       .scrollTop()
  //   },
  //   1000
  // );
}
