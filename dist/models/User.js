"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _mongoose = _interopRequireDefault(require("mongoose"));

// Import Dependencies
// Creating a Schema
var userSchema = new _mongoose["default"].Schema({
  username: {
    type: String,
    required: [true, "Username field is required!"],
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: [true, "Email field is required!"],
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password field is required!"],
    trim: true
  },
  createdEvents: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Event"
  }]
}, {
  timestamps: true
});
userSchema.pre("save",
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(next) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = this;

            if (user.isModified()) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", next());

          case 3:
            _context.next = 5;
            return _bcryptjs["default"].hash(user.password, 12);

          case 5:
            user.password = _context.sent;
            next();

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}()); // Export Model

var _default = _mongoose["default"].model("User", userSchema);

exports["default"] = _default;