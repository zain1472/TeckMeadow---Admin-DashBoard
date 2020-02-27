const mongoose = require("mongoose");

var messageSchema = new mongoose.Schema({
  sender: String,
  dated: {
    type: Date,
    default: Date.now()
  },
  message: String,
  reciever: String
});

module.exports = mongoose.model("message", messageSchema);
