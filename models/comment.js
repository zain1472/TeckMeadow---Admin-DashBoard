const mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
  author: Object,
  dated: {
    type: Date,
    default: Date.now(),
  },
  description: String,
});

module.exports = mongoose.model("comment", commentSchema);
