var router = require("express").Router();
var auth = require("../middleware/auth");
var User = require("../models/user");
var Project = require("../models/project");
var upload = require("../upload");
var fs = require("fs");
var path = require("path");
var mailer = require("../config/mailer");
var Notification = require("../models/notification");
// ROUTE GET /api/projects/
// DESC get all projects
// ACCESS USER
router.get("/", auth.isLoggedIn, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user.isAdmin == true) {
    Project.find({}, function (err, projects) {
      if (err) {
        res.status(500).json({ msg: "Internal Server error" });
      } else {
        res.json({ projects: projects });
      }
    });
  } else {
    const employee = await User.findById(req.user.id).populate("projects");
    res.json({ projects: employee.projects });
  }
});
// ROUTE GET /api/projects/
// DESC get all projects
// ACCESS USER
router.delete("/:id", auth.isAdmin, (req, res) => {
  Project.findByIdAndDelete(req.params.id, function (err, project) {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: "Internal server error" });
    } else {
      try {
        for (let index = 0; index < project.files.length; index++) {
          const element = project.files[index];
          fs.unlinkSync(
            path.join(__dirname, "../client/build/uploads/", element.path)
          );
        }
      } catch (error) {
        console.log(error);
      }

      console.log(project);
      res.json({ project });
    }
  });
});

// get form to edit project

router.put("/:id/", auth.isAdmin, async (req, res) => {
  console.log(req.body);

  try {
    var project = await Project.findById(req.params.id);
    project.title = req.body.title;
    project.description = req.body.description;
    project.dueDate = req.body.dueDate;
    project.price = req.body.price;

    await project.save();
    console.log(project);
    res.json({ project });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
  // Project.findByIdAndUpdate(req.params.id, newProject, function (err, project) {
  //   if (err) {

  //     console.log(err);
  //   } else {
  //     console.log(req.body);
  //     console.log(project);
  //     res.json({ project: project });
  //   }
  // });
});
// change project status
router.get("/:id/:status", auth.isLoggedIn, async (req, res) => {
  var status = req.params.status;
  var id = req.params.id;
  try {
    let project = await Project.findById(id);
    if (!project) {
      return res.status(400).json({ msg: "Project not found" });
    }
    let currentUser = await User.findById(req.user.id);
    let user = await User.findById(project.employee._id);
    if (currentUser.isAdmin == true) {
      project.status = status;
      if (status == "completed") {
        project.completionDate = Date.now();
      }
      let notification = await Notification.create({
        description: `Project  ${
          status === "awaitingPayment"
            ? "is awaiting payment"
            : "has been " + status
        } by administrator`,
        project: {
          _id: project._id,
          title: project.title,
        },
        owner: !currentUser.isAdmin ? "admin" : user._id.toString(),
        category: "project",
      });
      console.log(notification);
      user.notifications.push(notification);
      await project.save();
      await user.save();
      return res.json({ project });
    } else {
      if (status == "submitted" || status == "cancelled") {
        project.status = status;

        await Notification.create({
          description: `Project has been ${status} by employee`,
          project: {
            _id: project._id,
            title: project.title,
          },
          owner: !currentUser.isAdmin ? "admin" : user._id.toString(),
          category: "project",
        });
        await project.save();
        return res.json({ project });
      } else {
        return res
          .status(400)
          .json({ msg: "You are not allowed to do that..." });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});
router.post("/", auth.isAdmin, upload.array("files", 5), async (req, res) => {
  var name = req.body.employee;
  var files = [];
  for (let index = 0; index < req.files.length; index++) {
    const element = {
      filename: req.files[index].originalname,
      path: req.files[index].filename,
    };
    files.push(element);
  }

  User.findById(name, async function (err, user) {
    if (err) {
      console.log(err);
    } else {
      Project.create(
        {
          employee: {
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            username: user.firstname + user.lastname,
            image: user.image,
          },
          price: req.body.price,
          dueDate: req.body.dueDate,
          description: req.body.description,
          title: req.body.title,
          files: files,
        },
        async function (err, project) {
          console.log(project);
          user.projects.push(project);
          let currentUser = await User.findById(req.user.id);
          let notification = await Notification.create({
            description: "You have been assigned a new project",
            project: {
              _id: project._id,
              title: project.title,
            },
            owner: !currentUser.isAdmin ? "admin" : user._id.toString(),
            category: "project",
          });
          console.log(notification);
          user.notifications.push(notification);
          await user.save();
          // mailer.sendMail({
          //   from: "zain.abideen14572@gmail.com",
          //   to: user.email,
          //   subject: "New Project",
          //   text:
          //     `Hi there ` +
          //     user.firstname +
          //     ` ` +
          //     user.lastname +
          //     `, You have been assigned a new project form TeckMeadow. Go and check it out`,
          // });
          res.json({ project: project });
        }
      );
    }
  });
});

// add files
router.post(
  "/:id/addfile",
  auth.isLoggedIn,
  upload.array("files", 5),
  (req, res) => {
    Project.findById(req.params.id, async function (err, project) {
      if (err) {
        console.log(err);
        res.status(500).json({ msg: "Internal Server Error" });
      } else {
        for (let index = 0; index < req.files.length; index++) {
          var element = {
            filename: req.files[index].originalname,
            path: req.files[index].filename,
          };
          project.files.push(element);
        }
        let user = await User.findById(project.employee._id);
        let currentUser = await User.findById(req.user.id);
        let notification = await Notification.create({
          description: "A new file has been added to project",
          project: {
            _id: project._id,
            title: project.title,
          },
          owner: !currentUser.isAdmin ? "admin" : user._id.toString(),
          category: "project",
        });
        if (!currentUser.isAdmin) {
          user.notifications.push(notification);
          await user.save();
        }

        project.save();

        return res.json({ project });
      }
    });
  }
);
module.exports = router;
