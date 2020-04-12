const router = require("express").Router();
const User = require("../models/user");
const auth = require("../middleware/auth");
const Notification = require("../models/notification");
// @route /api/notifications/
// @desc get all notifications
// @access private
router.get("/", auth.isLoggedIn, async (req, res) => {
  try {
    let currentUser = await User.findById(req.user.id).populate(
      "notifications"
    );
    if (currentUser.isAdmin === true) {
      let notifications = await Notification.find({ owner: "admin" });
      res.json({ notifications });
    } else {
      let notifications = currentUser.notifications;
      res.json({ notifications });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// @route PUT /api/notifications/:id
// @desc mark a notification as read by the user
// @access private
router.put("/:id", auth.isLoggedIn, async (req, res) => {
  try {
    let id = req.params.id;
    let notification = await Notification.findById(id);
    notification.isRead = true;
    await notification.save();

    res.json({ notification });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Notification not found" });
  }
});

// @route PUT /api/notifications/
// @desc mark all notifications as read by the user
// @access private
router.put("/", auth.isLoggedIn, async (req, res) => {
  try {
    let currentUser = await User.findById(req.user.id).populate(
      "notifications"
    );
    if (currentUser.isAdmin === true) {
      let notifications = await Notification.find({ owner: "admin" });
      notifications.map(async (n) => {
        n.isRead = true;
        await n.save();
      });
      res.json({ notifications });
    } else {
      let notifications = currentUser.notifications;
      notifications.map(async (n) => {
        n.isRead = true;
        await n.save();
      });
      res.json({ notifications });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// @route DELETE /api/notifications/:id
// @desc delete a notification
// @access private
router.delete("/:id", auth.isLoggedIn, async (req, res) => {
  try {
    let id = req.params.id;
    let notification = await Notification.findByIdAndDelete(id);
    console.log(notification);
    res.json({ notification });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Notification not found" });
  }
});

// @route DELETE /api/notifications/
// @desc delete all notifications
// @access private
router.delete("/", auth.isLoggedIn, async (req, res) => {
  try {
    let currentUser = await User.findById(req.user.id).populate(
      "notifications"
    );
    if (currentUser.isAdmin === true) {
      let notifications = await Notification.find({ owner: "admin" });
      notifications.map(async (n) => {
        await Notification.findByIdAndDelete(n._id);
      });
      res.json({ projects: [] });
    } else {
      let notifications = currentUser.notifications;
      notifications.map(async (n) => {
        await Notification.findByIdAndDelete(n._id);
      });
      res.json({ notifications });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = router;
