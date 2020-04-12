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
  completionDate: Date,
});

module.exports = mongoose.model("project", projectSchema);
