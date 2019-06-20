"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

// Import Dependencies
// Creating a Schema
var bookingSchema = new _mongoose["default"].Schema({
  user: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  },
  event: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Event"
  }
}, {
  timestamps: true
}); // Export Model

var _default = _mongoose["default"].model("Booking", bookingSchema);

exports["default"] = _default;