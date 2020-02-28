const mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message"
    }
  ],
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project"
    }
  ],
  isAdmin: {
    type: Boolean,
    default: false
  },
  firstname: String,
  lastname: String,
  isOnline:{
    type:Boolean,
    default: false
  }
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
