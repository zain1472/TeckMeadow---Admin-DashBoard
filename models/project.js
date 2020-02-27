const mongoose = require("mongoose");

var projectSchema = new mongoose.Schema({
  sender: String,
  dated: {
    type: Date,
    default: Date.now()
  },
  price: Number,
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
});

module.exports = mongoose.model("project", projectSchema);
