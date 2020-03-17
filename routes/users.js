var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");
var middleware = require("../middleware/index");
var upload = require("../upload");
var fs = require('fs');
var path = require('path');
var randomString = require('random-string');
var mailer = require('../config/mailer');
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
    country: req.body.country,
    email: req.body.email,
    active: false
  });
  User.register(newUser, req.body.password, function (err) {
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      return res.redirect("/user/register");
    } else {
      passport.authenticate("local")(req, res, function () {
        req.flash("success", "Successfully registered your new account");
        res.redirect("/user/verify");
      });
    }
  });
});
router.get('/verify',middleware.isAuthenticated,(req,res)=>{
  mailer.sendMail({
    from:'zain.abideen14572@gmail.com',
    to:req.user.email,
    subject:'Verify Email Address',
    text:`click the link below to verify your email address
http://localhost:3000/user/verify/`+req.user._id
  },function (err) {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      res.render('user/verify');
    }
  });
});
router.get('/verify/:id',middleware.isAuthenticated,(req,res)=>{
  User.findById(req.params.id,function (err,user) {
    if (err) {
      console.log(err);
      req.flash("error",err.message);
      res.redirect('/');
    } else {
      user.active = true;
      user.save();
      req.flash('success',"Welcome to TeckMeadow")
      res.redirect('/');
    }
  })
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

router.get("/profile", middleware.isLoggedIn, (req, res) => {
  User.findById(req.user._id).populate("projects").exec(function (err,user) {
    if (err) {
      res.redirect('/');
      console.log(err);
    } else {
      res.render('user/profile',{currentUser:user});
    }
  })
  
});
router.post(
  "/profile",
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
        res.redirect("/user/profile");
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
