"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

// Import Dependencies
// Creating a Schema
var eventSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: [true, "Event name is required!"],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, "Event description is required!"],
    trim: true
  },
  price: {
    type: Number,
    required: [true, "Event price is required!"],
    trim: true
  },
  date: {
    type: Date,
    required: [true, "Event date is required!"]
  },
  owner: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  },
  bookedByUsers: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  }]
}, {
  timestamps: true
}); // Export Model

var _default = _mongoose["default"].model("Event", eventSchema);

exports["default"] = _default;