"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

// Import Dependencies
// Import Environment Variables
require("dotenv").config(); // Setup Database Connection


_mongoose["default"].connect(process.env.MONGODB_URI, {
  useNewUrlParser: true
}, function () {
  console.log("==> A database connection has been established");
});

_mongoose["default"].set("useCreateIndex", true);