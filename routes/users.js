var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");
var middleware = require("../middleware/index");
router.get("/login", function(req, res, next) {
  res.render("user/login");
});
router.get("/register", function(req, res, next) {
  res.render("user/register");
});
// =============//
// AUTH ROUTES
// =============//
// get register form

// handling new user
router.post("/register", (req, res) => {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function(err) {
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      return res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function() {
        // req.flash("success", "Successfully registered your new account");
        res.redirect("/");
      });
    }
  });
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  }),
  (req, res) => {}
);
router.get("/logout", (req, res) => {
  req.logOut();
  return res.redirect("/");
});

router.get("/", middleware.isLoggedIn, (req, res) => {
  User.find({}, function(err, campgrounds) {
    if (err) {
      console.log("No camps found in database");
    } else {
      console.log("successssss");
      res.render("user/index", { user: campgrounds });
    }
  });
});

router.get("/:id", middleware.isLoggedIn, (req, res) => {
  var id = req.params.id;
  User.findById(id)
    .populate("messages")
    .exec(function(err, campgrounds) {
      if (err) {
        console.log("No camps found in database");
      } else {
        console.log("successssss");
        res.render("index", {
          user: campgrounds,
          messages: campgrounds.messages
        });
      }
    });
});
router.get("/changePassword", (req, res, next) => {
  res.render("/user/changePassword");
});
module.exports = router;
