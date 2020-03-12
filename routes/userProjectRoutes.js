var router = require("express").Router();
var middleware = require("../middleware/index");
var User = require("../models/user");
var Project = require("../models/project");
var upload = require("../upload");
var fs = require("fs");
var path = require("path");
router.get("/", middleware.isUser, (req, res) => {
  User.findById(req.user._id).populate("projects").exec(function (err,user) {
    if (err) {
        res.redirect("/");
        console.log(err);
      } else {
        res.render("project/user/index", { projects: user.projects });
      }
  });
    
});
// completed projects
router.get("/status/:status", middleware.isUser, (req, res) => {
  var status = req.params.status;
  User.findById(req.user._id).populate("projects").exec(function (err,user) {
    if (err) {
        res.redirect("/user/project");
        console.log(err);
      } else {
        res.render("project/user/" + status, { projects: user.projects });
      }
  });
  
});

// get form to edit project


// change project status
router.get("/:id/:status", middleware.isAdmin, (req, res) => {
  var status = req.params.status;
  var id = req.params.id;
  
    Project.findById(id)
      .populate("Users")
      .exec(function (err, projects) {
        if (err) {
          res.redirect("/user/project");
          console.log(err);
        } else {

          
          if (status == "submitted") {
            req.flash("success", "The project has been submitted");
            projects.status = status;  
          } else if (status == "cancelled") {
            req.flash("success", "The project has been cancelled successfully");
            projects.status = status;
            }else{
            res.redirect('/user/project')
          }
          projects.save();

          res.redirect("/user/project/status/" + status);
        }
      });
  
});


// ----------
// Show project Detail
//
router.get("/:id", middleware.isUser, (req, res) => {
  Project.findById(req.params.id, function (err, project) {
    if (err) {
      console.log(err);
    } else {
      res.render("project/user/show", { project: project });
    }
  });
});

// add files
router.post(
  "/:id/addfile",
  middleware.isUser,
  upload.array("files", 5),
  (req, res) => {
    Project.findById(req.params.id, function (err, project) {
      if (err) {
        console.log(err);
      } else {
        for (let index = 0; index < req.files.length; index++) {
          const element = {
            filename: req.files[index].originalname,
            path: req.files[index].filename
          };
          project.files.push(element);
        }
        project.save();
        req.flash("success", "The files have been added successfully");
        return res.redirect("/user/project/" + project._id);
      }
    });
  }
);
module.exports = router;
