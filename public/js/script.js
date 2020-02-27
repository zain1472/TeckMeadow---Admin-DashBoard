var socket = io("https://5kqru.sse.codesandbox.io/");
var currentUser;
function add() {
  if (!currentUser) {
    // location.reload();
  } else {
    socket.on("connect", () => {
      socket.emit("new-user", { name: currentUser.username, id: socket.id });
      socket.on("message", data => {
        console.log(data);
        appendMessage(data.message);
      });
    });
  }
  var sender, reciever;
  if (currentUser) {
    if (currentUser.username === "wela") {
      sender = "wela";
      reciever = user.username;
      id = user.id;
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
    appendMessage(msg.value);
    msg.value = "";
  });
}
function appendMessage(message) {
  var newMessage = document.createElement("li");
  newMessage.innerText = message;
  document.getElementById("messages").append(newMessage);
}
