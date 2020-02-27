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
  ]
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
