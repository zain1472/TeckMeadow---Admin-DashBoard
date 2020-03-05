var express = require("express");
var router = express.Router();
var path = require("path");

/* GET home page. */
router.get("/:id/download", function(req, res, next) {
  res.download(path.join(__dirname, "../public/uploads/", req.params.id));
});

module.exports = router;
