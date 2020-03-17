var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
const bodyParser = require("body-parser");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user");
const mongoose = require("mongoose");
const flash = require("connect-flash");
var methodOverride = require("method-override");
var middleware = require("./middleware/index");
var userRoutes = require("./routes/users");
var adminRoutes = require("./routes/adminRoutes");
var projectRoutes = require("./routes/projectRoutes");
var userProjectRoutes = require('./routes/userProjectRoutes');
var fileRoutes = require("./routes/fileRoutes");
var Message = require("./models/message");
var users = [];

mongoose.connect(
  "mongodb+srv://wela:wela@cluster0-d3lhq.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }
);
app.use(methodOverride("_method"));
app.use(
  require("express-session")({
    secret: "TeckMeadow rockssss.",
    resave: false,
    saveUninitialized: false
  })
);
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.set("view engine", "ejs");
app.use(function (req, res, next) {
  res.locals.message = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

app.get("/", middleware.isLoggedIn, middleware.isUser, function (req, res) {
  // console.log(req.user);
  User.findById(req.user._id)
    .populate("messages")
    .exec(function (err, messages) {
      if (err) {
        console.log(err);
      } else {
        res.render("user/chat.ejs", {
          currentUser: messages
        });
      }
    });
});

app.use(require("express").static("public"));

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/admin/project", projectRoutes);
app.use("/user/project", userProjectRoutes);
app.use("/file", fileRoutes);
io.on("connection", function (socket) {
  socket.on("new-user", data => {
    socket.userId = data.userId;
    User.findById(data.userId, function (err, user) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        user.isOnline = true;
        user.save();
      }
    });
    users[data.name] = { socket: socket.id };
  });
  socket.on("message", data => {
    // store in database and then parse if online
    Message.create(
      {
        sender: data.sender,
        reciever: data.reciever,
        message: data.message
      },
      function (err, message) {
        if (err) {
          console.log(err);
        } else {
          User.findById(data.id, function (err, user) {
            if (err) {
              console.log(err);
            } else {
              user.messages.push(message);
              user.save();
            }
          });
        }
      }
    );

    if (users[data.reciever]) {
      if (io.sockets.connected[users[data.reciever].socket]) {
        console.log(data);

        io.sockets.connected[users[data.reciever].socket].emit("message", data);
      }
    }
  });
  socket.on("disconnect", function () {
    User.findById(socket.userId, function (err, user) {
      if (err) {
        console.log(err);
      } else {
        if (user) {
          user.isOnline = false;

          user.save();
        }
      }
    });
  });
});

http.listen(3000, function () {
  console.log("listening on *:3000");
});
