const mongoose = require("mongoose");

var notificationSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  isRead: {
    type: Boolean,
    default: false,
  },

  dated: {
    type: Date,
    default: Date.now(),
  },
  employee: Object,
  project: Object,
  message: Object,
  owner: String,
});

module.exports = mongoose.model("notification", notificationSchema);
