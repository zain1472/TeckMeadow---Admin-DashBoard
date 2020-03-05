var router = require("express").Router();
var middleware = require("../middleware/index");
var User = require("../models/user");
var Project = require("../models/project");
var upload = require("../upload");
router.get("/", middleware.isAdmin, (req, res) => {
  Project.find({})
    .populate("Users")
    .exec(function(err, projects) {
      if (err) {
        res.redirect("/admin/user");
        console.log(err);
      } else {
        res.render("project/admin/index", { projects: projects });
      }
    });
});
// completed projects
router.get("/status/:status", middleware.isAdmin, (req, res) => {
  var status = req.params.status;
  Project.find({})
    .populate("Users")
    .exec(function(err, projects) {
      if (err) {
        res.redirect("/admin/user");
        console.log(err);
      } else {
        res.render("project/admin/" + status, { projects: projects });
      }
    });
});
// change project status
router.get("/:id/:status", middleware.isAdmin, (req, res) => {
  var status = req.params.status;
  var id = req.params.id;
  if (status == "delete") {
    Project.findByIdAndDelete(id, function(err, project) {
      if (err) {
        console.log(err);
      } else {
        req.flash("success", "successfully deleted the project");
        res.redirect("/admin/project/");
      }
    });
  } else {
    Project.findById(id)
      .populate("Users")
      .exec(function(err, projects) {
        if (err) {
          res.redirect("/admin/user");
          console.log(err);
        } else {
          console.log(projects);
          projects.status = status;
          if (status == "completed") {
            projects.completionDate = Date.now();
          }
          projects.save();
          res.redirect("/admin/project/status/" + status);
        }
      });
  }
});
router.post("/", middleware.isAdmin, upload.array("files", 5), (req, res) => {
  var name = req.body.employee;
  var files = [];
  for (let index = 0; index < req.files.length; index++) {
    const element = {
      filename: req.files[index].originalname,
      path: req.files[index].filename
    };
    files.push(element);
  }
  User.findById(name, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      Project.create(
        {
          employee: {
            id: user._id,
            username: user.firstname + " " + user.lastname,
            image: user.image
          },
          price: req.body.price,
          dueDate: req.body.dueDate,
          description: req.body.description,
          title: req.body.title,
          files: files
        },
        function(err, project) {
          user.projects.push(project);
          user.save();
          req.flash("success", "Successfully created a new Project");
          res.redirect("/admin/project");
        }
      );
    }
  });
});

// ----------
// Show project Detail
//
router.get("/:id", middleware.isAdmin, (req, res) => {
  Project.findById(req.params.id, function(err, project) {
    if (err) {
      console.log(err);
    } else {
      res.render("project/admin/show", { project: project });
    }
  });
});
// add files
router.post(
  "/:id/addfile",
  middleware.isAdmin,
  upload.array("files", 5),
  (req, res) => {
    Project.findById(req.params.id, function(err, project) {
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
        return res.redirect("/admin/project/" + project._id);
      }
    });
  }
);
module.exports = router;
