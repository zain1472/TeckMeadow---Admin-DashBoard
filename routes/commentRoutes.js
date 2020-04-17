var router = require("express").Router();
var auth = require("../middleware/auth");
var User = require("../models/user");
var Project = require("../models/project");
var Comment = require("../models/comment");

router.post("/", auth.isLoggedIn, async (req, res) => {
  try {
    let currentUser = await User.findById(req.user.id);
    let project = await Project.findById(req.body.projectId).populate(
      "comments"
    );
    let comment = await Comment.create({
      description: req.body.description,
      author: {
        firstname: currentUser.firstname,
        lastname: currentUser.lastname,
        _id: currentUser._id,
        image: currentUser.image,
      },
    });
    project.comments.push(comment);
    await project.save();
    res.json({ project });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Servar" });
  }
});

router.delete("/:id", auth.isLoggedIn, async (req, res) => {
  try {
    let currentUser = await User.findById(req.user.id);
    let comment = await Comment.findById(req.params.id);
    if (comment.author._id.toString() == currentUser._id.toString()) {
      await Comment.findByIdAndDelete(comment._id);
      res.json({ comment });
    } else {
      res.status(400).json({ msg: "Access Denied..." });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Servar" });
  }
});

module.exports = router;
