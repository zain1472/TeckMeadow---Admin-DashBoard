var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");
var middleware = require("../middleware/index");
var upload = require("../upload");
var fs = require('fs');
var path = require('path');
router.get("/login", function (req, res, next) {
  res.render("user/login");
});
router.get("/register", function (req, res, next) {
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
  User.register(newUser, req.body.password, function (err) {
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      return res.redirect("/user/register");
    } else {
      passport.authenticate("local")(req, res, function () {
        req.flash("success", "Successfully registered your new account");
        res.redirect("/");
      });
    }
  });
});
router.post("/:id/makeAdmin", middleware.isAdmin, (req, res) => {
  var isAdmin = false;
  if (req.body.isAdmin == "true") {
    isAdmin = true;
  }
  var user = {
    isAdmin: isAdmin
  };
  User.findById(req.params.id, function (err, newUser) {
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      return res.redirect("/admin/user/" + req.params.id);
    } else {
      newUser.isAdmin = isAdmin;
      console.log(isAdmin);
      newUser.save();
      req.flash("error", "New changes have been saved successfully");
      res.redirect("/admin/user/" + req.params.id);
      console.log(newUser);
    }
  });
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/user/login"
  }),
  (req, res) => { }
);
router.get("/logout", (req, res) => {
  req.logOut();
  return res.redirect("/");
});

router.get("/:id", middleware.isLoggedIn, (req, res) => {
  var id = req.params.id;
  User.findById(id)
    .populate("messages")
    .exec(function (err, user) {
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
    User.findByIdAndUpdate(req.user._id, newUser, function (err, user) {
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
router.get("/:id/delete", middleware.isAdmin, (req, res) => {
  User.findByIdAndDelete(req.params.id).populate('projects').exec(function (err, user) {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      req.flash("success", "Successfully deleted the user");
      res.redirect('/admin/user');
      fs.unlinkSync(path.join(__dirname, "../public/uploads/", user.image));
    }
  })
})
module.exports = router;
