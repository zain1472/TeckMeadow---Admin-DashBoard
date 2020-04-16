const mongoose = require("mongoose");

var projectSchema = new mongoose.Schema({
  dated: {
    type: Date,
    default: Date.now(),
  },
  price: Number,
  employee: Object,
  files: [
    {
      filename: String,
      path: String,
    },
  ],
  dueDate: Date,
  title: String,
  description: String,
  status: {
    type: String,
    default: "ongoing",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
  completionDate: Date,
});

module.exports = mongoose.model("project", projectSchema);
