const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
    },
  ],
  notifications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "notification",
    },
  ],
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
  firstname: String,
  lastname: String,
  isOnline: {
    type: Boolean,
    default: false,
  },
  country: String,
  image: String,
  gender: String,
  email: String,
  active: Boolean,
  joined: {
    default: Date.now(),
    type: Date,
  },
  count: {
    type: Number,
    default: 0,
  },
  haveUnreadMessages: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("User", userSchema);
