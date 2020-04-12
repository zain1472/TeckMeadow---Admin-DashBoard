var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/client/build/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

module.exports = multer({
  storage: storage,
  limits: { fileSize: "100MB", fieldSize: "100MB" },
});
