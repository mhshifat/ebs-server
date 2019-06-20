"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import Environment Variables
require("dotenv").config();

// Setup Database Connection
// Import Dependencies
_mongoose2.default.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, function () {
  console.log("==> A database connection has been established");
});
_mongoose2.default.set("useCreateIndex", true);