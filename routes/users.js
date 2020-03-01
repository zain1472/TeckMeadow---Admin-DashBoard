var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");
var middleware = require("../middleware/index");
var upload = require("../upload");
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
router.post("/register", upload.single("photo"), (req, res) => {
  var newUser = new User({
    username: req.body.username,
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    image: req.file.filename,
    country: req.body.country
  });
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
router.get("/:id/makeAdmin", middleware.isAdmin, (req, res) => {
  User.findById(req.params.id, function(err, newUser) {
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      return res.redirect("/edit");
    } else {
      newUser.isAdmin = true;
      newUser.save();
      console.log(newUser);
      res.redirect("/");
    }
  });
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/user/login"
  }),
  (req, res) => {}
);
router.get("/logout", (req, res) => {
  req.logOut();
  return res.redirect("/");
});

router.get("/:id", middleware.isLoggedIn, (req, res) => {
  var id = req.params.id;
  User.findById(id)
    .populate("messages")
    .exec(function(err, user) {
      if (err) {
        console.log("No such user found in database");
      } else {
        res.render("user/show", {
          user: user
        });
      }
    });
});
router.get("/:id/edit", middleware.isLoggedIn, (req, res) => {
  res.render("user/edit");
});
router.post(
  "/:id/edit",
  middleware.isLoggedIn,
  upload.single("photo"),
  (req, res) => {
    var filename;
    if (req.file) {
      filename = req.file.filename;
    } else {
      filename = req.user.image;
    }
    var newUser = {
      username: req.body.username,
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      image: filename,
      country: req.body.country,
      gender: req.body.gender
    };
    User.findByIdAndUpdate(req.user._id, newUser, function(err, user) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/user/" + req.user._id);
      }
    });
  }
);
router.get("/changePassword", (req, res, next) => {
  res.render("/user/changePassword");
});
module.exports = router;
