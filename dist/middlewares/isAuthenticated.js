"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _default =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(resolver, parent, args, ctx, info) {
    var req, res, token, decodedToken, findUser;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            req = ctx.req, res = ctx.res;
            token = req.get("x-token");

            if (token) {
              _context.next = 6;
              break;
            }

            _context.next = 5;
            return resolver(parent, args, (0, _objectSpread2["default"])({}, ctx, {
              authenticatedUser: null
            }), info);

          case 5:
            return _context.abrupt("return", _context.sent);

          case 6:
            _context.prev = 6;
            decodedToken = _jsonwebtoken["default"].verify(token, "MySuperSecretPassword");
            _context.next = 10;
            return ctx.models.User.findById(decodedToken.id);

          case 10:
            findUser = _context.sent;
            _context.next = 13;
            return resolver(parent, args, (0, _objectSpread2["default"])({}, ctx, {
              authenticatedUser: findUser
            }), info);

          case 13:
            return _context.abrupt("return", _context.sent);

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](6);
            _context.next = 20;
            return resolver(parent, args, (0, _objectSpread2["default"])({}, ctx, {
              authenticatedUser: null
            }), info);

          case 20:
            return _context.abrupt("return", _context.sent);

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 16]]);
  }));

  return function (_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;