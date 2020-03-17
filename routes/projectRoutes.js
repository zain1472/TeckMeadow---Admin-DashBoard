var router = require("express").Router();
var middleware = require("../middleware/index");
var User = require("../models/user");
var Project = require("../models/project");
var upload = require("../upload");
var fs = require("fs");
var path = require("path");
var mailer = require("../config/mailer");
router.get("/", middleware.isAdmin, (req, res) => {
  Project.find({})
    .populate("Users")
    .exec(function (err, projects) {
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
    .exec(function (err, projects) {
      if (err) {
        res.redirect("/admin/user");
        console.log(err);
      } else {
        res.render("project/admin/" + status, { projects: projects });
      }
    });
});

// get form to edit project
router.get("/:id/edit", middleware.isAdmin, (req, res) => {
  Project.findById(req.params.id, function (err, project) {
    if (err) {
      console.log(err);
    } else {
      console.log(project);
      console.log(project.dueDate.toDateString());
      res.render("project/admin/edit", { project: project });
    }
  });
});
router.post("/:id/edit", middleware.isAdmin, (req, res) => {
  var newProject = {
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
    price: req.body.price
  }
  Project.findByIdAndUpdate(req.params.id, newProject, function (err, project) {
    if (err) {
      console.log(err);
    } else {
      console.log(req.body);
      req.flash("success", "Applied the changes to the project successfully")
      res.redirect("/admin/project/" + req.params.id);
    }
  });
});
// change project status
router.get("/:id/:status", middleware.isAdmin, (req, res) => {
  var status = req.params.status;
  var id = req.params.id;
  if (status == "delete") {
    Project.findByIdAndDelete(id, function (err, project) {
      if (err) {
        console.log(err);
      } else {
        if (project) {
          for (let index = 0; index < project.files.length; index++) {
            const element = project.files[index];
            fs.unlinkSync(
              path.join(__dirname, "../public/uploads/", element.path)
            );
          }
        }
        req.flash("success", "successfully deleted the project");
        res.redirect("/admin/project/");
      }
    });
  } else {
    Project.findById(id)
      .populate("Users")
      .exec(function (err, projects) {
        if (err) {
          res.redirect("/admin/user");
          console.log(err);
        } else {

          projects.status = status;
          if (status == "completed") {
            req.flash("success", "The payment has been marked as completed");
            mailer.sendMail({
              from:'zain.abideen14572@gmai.com',
              to:projects.employee.email,
              subject: 'Project Completed',
              html:'<p>Hey '+projects.employee.username+',</p><br><p>Thank you for signing up to my weekly newsletter.Before we get started, you’ll have to confirm your email address.Click on the button below to verify your email address and you’re officially one of us!<a href="">link</a></p>'
            })
            projects.completionDate = Date.now();
          } else if (status == "awaitingPayment") {
            req.flash("success", "The project is now awaiting payment");
          } else if (status == "cancelled") {
            req.flash("success", "The project has been cancelled successfully");
          }else{
            res.redirect('/admin/project')
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
  User.findById(name, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      Project.create(
        {
          employee: {
            id: user._id,
            username: user.firstname + " " + user.lastname,
            image: user.image,
            email: user.email
          },
          price: req.body.price,
          dueDate: req.body.dueDate,
          description: req.body.description,
          title: req.body.title,
          files: files
        },
        function (err, project) {
          user.projects.push(project);
          user.save();
          mailer.sendMail({
            from:'zain.abideen14572@gmail.com',
            to: user.email,
            subject: 'New Project',
            text:`Hi there `+user.firstname +` `+user.lastname + `, You have been assigned a new project form TeckMeadow. Go and check it out`
          })
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
  Project.findById(req.params.id, function (err, project) {
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
        return res.redirect("/admin/project/" + project._id);
      }
    });
  }
);
module.exports = router;
