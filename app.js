var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const activityRouter = require("./routes/activity");
const todoRouter = require("./routes/todo");

// const db = require("./lib/database");

// (async () => {
//   await db.sync();
// })();

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use(activityRouter);
app.use(todoRouter);

module.exports = app;
