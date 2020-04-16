var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");
var middleware = require("../middleware/index");
var auth = require("../middleware/auth");
var upload = require("../upload");
var fs = require("fs");
var path = require("path");
var randomString = require("random-string");
var mailer = require("../config/mailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// @route POST /api/users/
// @desc register a new usr
// @access public
router.post("/", upload.single("photo"), async (req, res) => {
  console.log(req.file);
  const { firstname, lastname, email, password, country } = req.body;
  console.log(req.body);
  console.log("object");
  if (!email || email === "" || !password || password === "") {
    res.status(400).json({ msg: "Please enter an email and password" });
  } else {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ msg: "The email address has already been registered" });
    } else {
      try {
        user = await new User({
          firstname,
          lastname,
          email,
          password,
          country,
          image: req.file.filename,
        });
        let salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const payload = {
          user: {
            id: user._id,
          },
        };
        jwt.sign(
          payload,
          config.get("secret"),
          { expiresIn: 3600 },
          (err, token) => {
            if (err) {
              console.log("object");
              console.log(err);
              res.send("server error");
            } else {
              return res.json({ token });
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  }
});
// handling new user

router.get("/verify", middleware.isAuthenticated, (req, res) => {
  mailer.sendMail(
    {
      from: "zain.abideen14572@gmail.com",
      to: req.user.email,
      subject: "Verify Email Address",
      text:
        `click the link below to verify your email address
http://localhost:3000/user/verify/` + req.user._id,
    },
    function (err) {
      if (err) {
        console.log(err);
        res.redirect("/");
      } else {
        res.render("user/verify");
      }
    }
  );
});
router.get("/verify/:id", middleware.isAuthenticated, (req, res) => {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("/");
    } else {
      user.active = true;
      user.save();
      req.flash("success", "Welcome to TeckMeadow");
      res.redirect("/");
    }
  });
});

router.put(
  "/:id",
  auth.isLoggedIn,
  upload.single("photo"),
  async (req, res) => {
    var filename;
    var currentUser = await User.findById(req.user.id);
    if (req.body.isAdmin === "true") {
      req.body.isAdmin = true;
    } else {
      req.body.isAdmin = false;
    }
    if (req.file) {
      filename = req.file.filename;
    } else {
      user = await User.findById(req.params.id);
      filename = user.image;
    }
    var newUser = {
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      country: req.body.country,
      isAdmin: req.body.isAdmin,
      image: filename,
    };
    // console.log(currentUser);
    // User.findByIdAndUpdate(req.params.id, newUser, function (
    //   err,
    //   upadatedUser
    // ) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     return res.send(upadatedUser);
    //   }
    // });

    // user changing his own profile
    if (currentUser._id == req.params.id) {
      console.log("hi there");
      // make sure he doesn't change his role
      if (currentUser.isAdmin !== req.body.isAdmin) {
        res.status(400).json({ msg: "You are allowed to do that" });
      } else {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          newUser
        );

        return res.json({ updatedUser });
      }
    } else {
      // If a user is changing another user
      // make sure he is admin
      if (!currentUser.isAdmin) {
        console.log("here");
        res.status(400).json({ msg: "You are allowed to do that" });
      } else {
        const updatedUser = await User.findById(req.params.id);
        console.log(updatedUser);
        updatedUser.isAdmin = newUser.isAdmin;
        updatedUser.firstname = newUser.firstname;
        updatedUser.lastname = newUser.lastname;
        updatedUser.country = newUser.country;
        updatedUser.image = newUser.image;
        updatedUser.save();
        console.log(newUser);
        return res.json({ updatedUser });
      }
    }
  }
);

router.get("/changePassword", (req, res, next) => {
  res.render("/user/changePassword");
});
router.delete("/:id/", auth.isAdmin, (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .populate("projects")
    .exec(function (err, user) {
      if (err) {
        console.log(err);
        res.status(500).json({ msg: "Internal Server Error" });
      } else {
        fs.unlinkSync(
          path.join(__dirname, "../client/build/uploads/", user.image)
        );
        res.json({ user });
      }
    });
});

// User Notifications
// clear notification count of messages in admin chat
router.put("/:id/count", async (req, res) => {
  try {
    let user = await User.findById(req.params.id)
      .populate("messages")
      .populate("projects");
    user.count = 0;
    await user.save();
    res.json({ user });
    console.log(user);
  } catch (error) {
    res.status(500).json({ msg: "Internal Servar" });
  }
});
// clear unread messages
router.put("/:id/haveUnreadMessages", async (req, res) => {
  try {
    let user = await User.findById(req.params.id)
      .populate("messages")
      .populate("projects");
    user.haveUnreadMessages = false;
    await user.save();
    res.json({ user });
    console.log(user);
  } catch (error) {
    res.status(500).json({ msg: "Internal Servar" });
  }
});
module.exports = router;
