"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Creating a Schema
var eventSchema = new _mongoose2.default.Schema({
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
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: "User"
  },
  bookedByUsers: [{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: "User"
  }]
}, {
  timestamps: true
});

// Export Model
// Import Dependencies
exports.default = _mongoose2.default.model("Event", eventSchema);