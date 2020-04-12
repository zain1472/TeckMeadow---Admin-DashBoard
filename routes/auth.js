const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/user");
const auth = require("../middleware/auth");
// @route /api/auth/
// @desc get a logged in user
// @access private
router.get("/", auth.isLoggedIn, async (req, res) => {
  try {
    let user = await User.findById(req.user.id)
      .populate("messages")
      .select("-password");
    res.json({ user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "internal server error" });
  }
});

// @route POST /api/auth/
// @desc log in a user
// @access public
router.post(
  "/",
  [check("email").isEmail(), check("password").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (user == null) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      } else {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ msg: "Invalid Credentials" });
        } else {
          const payload = {
            user: {
              id: user._id,
            },
          };
          jwt.sign(
            payload,
            config.get("secret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) {
                console.log(err);
                res.status(400).json({ msg: "Internal Server Error" });
              } else {
                res.json({ token });
              }
            }
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
);

// @route /api/auth/
// @desc get a logged in user
// @access public
// router.get("/", (req, res) => {
//   return res.send("get a logged in user");
// });

module.exports = router;
