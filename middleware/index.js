module.exports = {
  // checkPasswordChangePermission: function(req, res, next) {
  //   if (req.isAuthenticated()) {
  //     User.findById(req.user.id, function(err, foundCampground) {
  //       if (foundCampground.author.id.equals(req.user._id)) {
  //         next();
  //       } else {
  //         res.redirect("back");
  //       }
  //     });
  //   } else {
  //     res.redirect("back");
  //   }
  // },
  isUser: function(req, res, next) {
    if (req.isAuthenticated()) {
      if (req.user.isAdmin) {
        res.redirect("/admin/user");
      } else {
        next();
      }
    } else {
      next();
    }
  },
  isLoggedIn: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error", "You must be logged in first");
    res.redirect("/user/login");
    // },
    // checkCampgroundOwnership: function(req, res, next) {
    //   if (req.isAuthenticated()) {
    //     if (req.user.isAdmin) {
    //       return next();
    //     }
    //     Campground.findById(req.params.id, function(err, foundCampground) {
    //       if (foundCampground && foundCampground.author.id.equals(req.user._id)) {
    //         next();
    //       } else {
    //         res.redirect("back");
    //       }
    //     });
    //   } else {
    //     res.redirect("back");
    //   }
    // },
    // isAdmin: function(req, res, next) {
    //   if (req.isAuthenticated()) {
    //     if (req.user.isAdmin) {
    //       next();
    //     } else {
    //       res.redirect("back");
    //     }
    //   } else {
    //     res.redirect("back");
    //   }
  },
  isAdmin: function(req, res, next) {
    if (req.isAuthenticated()) {
      if (req.user.isAdmin == true) {
        return next();
      } else {
        res.redirect("back");
      }
    } else {
      res.redirect("/user/login");
    }
  }
};
