var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Message = require("../models/message");
/* GET home page. */
router.get("/user/:id/chat", function(req, res, next) {
  User.findById(req.params.id)
    .populate("messages")
    .exec(function(err, user) {
      if (err) {
        console.log(err);
      } else {
        console.log(user);
        res.render("chat", { user: user });
      }
    });
});

module.exports = router;
