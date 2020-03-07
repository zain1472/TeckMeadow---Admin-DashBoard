var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Message = require("../models/message");
var Project = require("../models/project");
var middleware = require("../middleware/index");
/* GET home page. */
// Get admin profile
router.get('/profile', middleware.isAdmin, (req, res) => {
  Project.find({}, function (err, projects) {
    if (err) {
      console.log(err);
    } else {
      res.render('admin/profile', { projects: projects });
    }
  })
});
// Edit admin Profile
router.post('/profile', middleware.isAdmin, (req, res) => {
  var newUser = { firstname: req.body.firstname, lastname: req.body.lastname, country: req.body.country }
  User.findByIdAndUpdate(req.user._id, newUser, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      req.flash("success", "Successfully applied the changes to your profile");
      res.redirect('/admin/profile')
    }
  })
});
router.get("/user/:id/chat", function (req, res, next) {
  User.findById(req.params.id)
    .populate("messages")
    .exec(function (err, user) {
      if (err) {
        console.log(err);
      } else {
        res.render("chat", { user: user });
      }
    });
});
router.get("/user", middleware.isAdmin, (req, res) => {
  User.find({}, function (err, campgrounds) {
    if (err) {
      console.log("No camps found in database");
    } else {
      res.render("user/index", { users: campgrounds });
    }
  });
});
router.get("/user/:id", middleware.isAdmin, (req, res) => {
  User.findById(req.params.id).populate('projects').exec(function (err, user) {
    if (err) {
      console.log("User not found");
    } else {
      res.render("admin/showUser", { user: user });
    }
  });
});

module.exports = router;
