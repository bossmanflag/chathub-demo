const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const CORS = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
var http = require("http").Server(app);
var io = require("socket.io")(http);
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(express.static("public"));

//models
const Users = require("./models/Users");

app.use(CORS());

io.on("connection", function (socket) {
  socket.on("chat message", function (msg) {
    io.emit("chat message", msg);
    console.log(msg);
  });
});

app.post("/signup", (req, res) => {
  var user = new Users({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
  });
  user.save((err) => {
    if (err) {
      console.log(err);
      res.send(false);
      return;
    }
    res.send(true);
  });
});

app.post("/login", (req, res) => {
  var loginUser = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    if (loginUser.password !== null && loginUser.username !== null) {
      Users.findOne({ username: loginUser.username }, (err, user) => {
        console.log(user);
        if (err || user === null) {
          res.send(false);
        } else {
          if (loginUser.password === user.password) {
            res.send(true);
          } else {
            res.send(false);
          }
        }
      });
    } else {
      res.send(false);
    }
  } catch (err) {
    res.send(false);
  }
});

try {
  mongoose.connect(
    "mongodb://127.0.0.1:27017/chathub",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      http.listen(port, () => {
        console.log("Listening and Connected");
        console.log(mongoose.connection.host);
        console.log(mongoose.connection.port);
      });
    }
  );
} catch (error) {
  console.log("could not connect");
}
