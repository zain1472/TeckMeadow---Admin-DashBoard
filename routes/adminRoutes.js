var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Message = require("../models/message");
var middleware = require("../middleware/index");
/* GET home page. */
router.get("/user/:id/chat", function(req, res, next) {
  User.findById(req.params.id)
    .populate("messages")
    .exec(function(err, user) {
      if (err) {
        console.log(err);
      } else {
        res.render("chat", { user: user });
      }
    });
});
router.get("/user", middleware.isAdmin, (req, res) => {
  User.find({}, function(err, campgrounds) {
    if (err) {
      console.log("No camps found in database");
    } else {
      res.render("user/index", { users: campgrounds });
    }
  });
});
router.get("/user/:id", middleware.isAdmin, (req, res) => {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      console.log("User not found");
    } else {
      res.render("admin/showUser", { user: user });
    }
  });
});

module.exports = router;
