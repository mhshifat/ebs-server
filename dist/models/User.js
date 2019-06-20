"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _bcryptjs = require("bcryptjs");

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Creating a Schema
// Import Dependencies
var userSchema = new _mongoose2.default.Schema({
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
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: "Event"
  }]
}, {
  timestamps: true
});

userSchema.pre("save", function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(next) {
    var user;
    return _regenerator2.default.wrap(function _callee$(_context) {
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
            return _bcryptjs2.default.hash(user.password, 12);

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
}());

// Export Model
exports.default = _mongoose2.default.model("User", userSchema);