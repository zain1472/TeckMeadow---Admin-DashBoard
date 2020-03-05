var express = require("express");
var router = express.Router();
var path = require("path");
var Project = require("../models/project");
var fs = require("fs");

/* GET home page. */
router.get("/:id/download", function(req, res, next) {
  res.download(path.join(__dirname, "../public/uploads/", req.params.id));
});

router.get("/:id/delete/:project/:filename/:fileId", (req, res) => {
  var file;

  Project.findById(req.params.project, function(err, project) {
    if (err) {
      console.log(err);
    } else {
      console.log(project);
      let index;
      for (index = 0; index < project.files.length; index++) {
        const element = project.files[index];
        if (element._id == req.params.fileId) {
          file = element;
          break;
        }
      }
      fs.unlinkSync(path.join(__dirname, "../public/uploads/", file.path));
      project.files.splice(index, 1);
      project.save();
      req.flash("success", "Successfully deleted the file");
      res.redirect("back");
      console.log(index);
    }
  });
});

module.exports = router;
