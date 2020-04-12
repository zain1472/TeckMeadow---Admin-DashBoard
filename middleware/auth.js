const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/user");
module.exports = {
  isLoggedIn: (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).json({ msg: "no token, access denied" });
    } else {
      try {
        const decoded = jwt.verify(token, config.get("secret"));
        if (!decoded) {
          return res.status(401).json({ msg: "Invalid token, access denied" });
        } else {
          req.user = decoded.user;
          return next();
        }
      } catch (error) {
        console.log(error.message);
        return res.status(401).json({ msg: "Invalid token, access denied" });
      }
    }
  },
  isAdmin: (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).json({ msg: "no token, access denied" });
    } else {
      try {
        const decoded = jwt.verify(token, config.get("secret"));
        if (!decoded) {
          return res.status(401).json({ msg: "Invalid token, access denied" });
        } else {
          req.user = decoded.user;
          User.findById(req.user.id, function (err, user) {
            if (err) {
              console.log(err);
              return res.status(500).json({ msg: "Internal server error" });
            } else {
              if (user.isAdmin === true) {
                return next();
              } else {
                return res.status(401).json({ msg: "Access Denied..." });
              }
            }
          });
        }
      } catch (error) {
        console.log(error.message);
        return res.status(401).json({ msg: "Invalid token, access denied" });
      }
    }
  },
};
