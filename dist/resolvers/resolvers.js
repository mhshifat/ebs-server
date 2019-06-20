"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _bcryptjs = require("bcryptjs");

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Query: {
    user: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_, __, _ref2) {
        var User = _ref2.models.User,
            authenticatedUser = _ref2.authenticatedUser;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (authenticatedUser) {
                  _context.next = 2;
                  break;
                }

                throw new Error("Authenticated required!");

              case 2:
                _context.next = 4;
                return User.findById(authenticatedUser.id);

              case 4:
                return _context.abrupt("return", _context.sent);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function user(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }(),
    events: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_, __, _ref4) {
        var _ref4$models = _ref4.models,
            Event = _ref4$models.Event,
            Booking = _ref4$models.Booking,
            authenticatedUser = _ref4.authenticatedUser;
        var bookedEvents, bookedEventsList, events;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Booking.find({
                  user: authenticatedUser.id
                });

              case 2:
                bookedEvents = _context2.sent;
                bookedEventsList = bookedEvents.reduce(function (acc, val) {
                  acc.push(val.event);
                  return acc;
                }, []);
                _context2.next = 6;
                return Event.find({
                  _id: { $nin: bookedEventsList }
                });

              case 6:
                events = _context2.sent;
                return _context2.abrupt("return", events);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      }));

      return function events(_x4, _x5, _x6) {
        return _ref3.apply(this, arguments);
      };
    }(),
    bookings: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_, __, _ref6) {
        var Booking = _ref6.models.Booking,
            authenticatedUser = _ref6.authenticatedUser;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (authenticatedUser) {
                  _context3.next = 2;
                  break;
                }

                throw new Error("Authenticated required!");

              case 2:
                _context3.next = 4;
                return Booking.find({ user: authenticatedUser.id }).populate("user event");

              case 4:
                return _context3.abrupt("return", _context3.sent);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, undefined);
      }));

      return function bookings(_x7, _x8, _x9) {
        return _ref5.apply(this, arguments);
      };
    }()
  },
  Mutation: {
    login: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(_, _ref8, _ref9) {
        var email = _ref8.email,
            password = _ref8.password;
        var User = _ref9.models.User;
        var findUser, isPwdMatched, token;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return User.findOne({ email: email });

              case 3:
                findUser = _context4.sent;

                if (findUser) {
                  _context4.next = 6;
                  break;
                }

                return _context4.abrupt("return", {
                  success: false,
                  errors: [{
                    path: "email",
                    message: "User not exist!"
                  }]
                });

              case 6:
                _context4.next = 8;
                return _bcryptjs2.default.compare(password, findUser.password);

              case 8:
                isPwdMatched = _context4.sent;

                if (isPwdMatched) {
                  _context4.next = 11;
                  break;
                }

                return _context4.abrupt("return", {
                  success: false,
                  errors: [{
                    path: "password",
                    message: "Password not matched!"
                  }]
                });

              case 11:
                token = _jsonwebtoken2.default.sign({
                  id: findUser.id,
                  username: findUser.username,
                  email: findUser.email
                }, "MySuperSecretPassword", { expiresIn: "1d" });
                return _context4.abrupt("return", { success: true, token: token });

              case 15:
                _context4.prev = 15;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", {
                  success: false,
                  errors: [{
                    path: "username",
                    message: "Something went wrong!"
                  }]
                });

              case 18:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, undefined, [[0, 15]]);
      }));

      return function login(_x10, _x11, _x12) {
        return _ref7.apply(this, arguments);
      };
    }(),
    register: function () {
      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(_, args, _ref11) {
        var User = _ref11.models.User;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return User.create(args);

              case 3:
                return _context5.abrupt("return", { success: true });

              case 6:
                _context5.prev = 6;
                _context5.t0 = _context5["catch"](0);
                return _context5.abrupt("return", {
                  success: false,
                  errors: [{
                    path: "username",
                    message: "Something went wrong!"
                  }]
                });

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, undefined, [[0, 6]]);
      }));

      return function register(_x13, _x14, _x15) {
        return _ref10.apply(this, arguments);
      };
    }(),
    createEvent: function () {
      var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(_, _ref13, _ref14) {
        var name = _ref13.name,
            otherArgs = (0, _objectWithoutProperties3.default)(_ref13, ["name"]);
        var _ref14$models = _ref14.models,
            Event = _ref14$models.Event,
            User = _ref14$models.User,
            authenticatedUser = _ref14.authenticatedUser;
        var findEvent, event, findUser;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;

                if (authenticatedUser) {
                  _context6.next = 3;
                  break;
                }

                throw new Error("Authenticated required!");

              case 3:
                _context6.next = 5;
                return Event.findOne({ name: name });

              case 5:
                findEvent = _context6.sent;

                if (!findEvent) {
                  _context6.next = 8;
                  break;
                }

                return _context6.abrupt("return", {
                  success: false,
                  errors: [{
                    path: "name",
                    message: "Event name has taken!"
                  }]
                });

              case 8:
                _context6.next = 10;
                return Event.create((0, _extends3.default)({
                  name: name
                }, otherArgs, {
                  owner: authenticatedUser.id
                }));

              case 10:
                event = _context6.sent;
                _context6.next = 13;
                return User.findById(authenticatedUser.id);

              case 13:
                findUser = _context6.sent;

                findUser.createdEvents.push(event);
                findUser.save();
                return _context6.abrupt("return", { success: true, event: event });

              case 19:
                _context6.prev = 19;
                _context6.t0 = _context6["catch"](0);

                console.log(_context6.t0);
                return _context6.abrupt("return", {
                  success: false,
                  errors: [{
                    path: "username",
                    message: "Something went wrong!"
                  }]
                });

              case 23:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, undefined, [[0, 19]]);
      }));

      return function createEvent(_x16, _x17, _x18) {
        return _ref12.apply(this, arguments);
      };
    }(),
    bookEvent: function () {
      var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(_, _ref16, _ref17) {
        var eventId = _ref16.eventId;
        var _ref17$models = _ref17.models,
            Booking = _ref17$models.Booking,
            Event = _ref17$models.Event,
            authenticatedUser = _ref17.authenticatedUser;
        var isBookingExist, findEvent;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;

                if (authenticatedUser) {
                  _context7.next = 3;
                  break;
                }

                throw new Error("Authenticated required!");

              case 3:
                _context7.next = 5;
                return Booking.findOne({ event: eventId });

              case 5:
                isBookingExist = _context7.sent;

                if (!isBookingExist) {
                  _context7.next = 8;
                  break;
                }

                return _context7.abrupt("return", {
                  success: false,
                  errors: [{
                    path: "event",
                    message: "You booked it before!"
                  }]
                });

              case 8:
                _context7.next = 10;
                return Event.findById(eventId);

              case 10:
                findEvent = _context7.sent;

                if (!(String(findEvent.owner) === authenticatedUser.id)) {
                  _context7.next = 13;
                  break;
                }

                return _context7.abrupt("return", {
                  success: false,
                  errors: [{
                    path: "event",
                    message: "Can't book your own event!"
                  }]
                });

              case 13:
                if (findEvent) {
                  _context7.next = 15;
                  break;
                }

                return _context7.abrupt("return", {
                  success: false,
                  errors: [{
                    path: "event",
                    message: "Event not exist!"
                  }]
                });

              case 15:
                _context7.next = 17;
                return Booking.create({
                  user: authenticatedUser.id,
                  event: eventId
                });

              case 17:
                return _context7.abrupt("return", { success: true, event: findEvent });

              case 20:
                _context7.prev = 20;
                _context7.t0 = _context7["catch"](0);
                return _context7.abrupt("return", {
                  success: false,
                  errors: [{
                    path: "username",
                    message: "Something went wrong!"
                  }]
                });

              case 23:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, undefined, [[0, 20]]);
      }));

      return function bookEvent(_x19, _x20, _x21) {
        return _ref15.apply(this, arguments);
      };
    }(),
    cancelBooking: function () {
      var _ref18 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(_, _ref19, _ref20) {
        var eventId = _ref19.eventId;
        var _ref20$models = _ref20.models,
            Booking = _ref20$models.Booking,
            Event = _ref20$models.Event,
            authenticatedUser = _ref20.authenticatedUser;
        var isBookingExist, findEvent;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;

                if (authenticatedUser) {
                  _context8.next = 3;
                  break;
                }

                throw new Error("Authenticated required!");

              case 3:
                _context8.next = 5;
                return Booking.findOne({
                  event: eventId,
                  user: authenticatedUser.id
                });

              case 5:
                isBookingExist = _context8.sent;

                if (isBookingExist) {
                  _context8.next = 8;
                  break;
                }

                return _context8.abrupt("return", {
                  success: false,
                  errors: [{
                    path: "booking",
                    message: "Booking not exist!"
                  }]
                });

              case 8:
                _context8.next = 10;
                return Event.findById(eventId);

              case 10:
                findEvent = _context8.sent;
                _context8.next = 13;
                return Booking.findOneAndDelete({ event: eventId });

              case 13:
                return _context8.abrupt("return", { success: true, event: findEvent });

              case 16:
                _context8.prev = 16;
                _context8.t0 = _context8["catch"](0);

                console.log(_context8.t0);
                return _context8.abrupt("return", {
                  success: false,
                  errors: [{
                    path: "username",
                    message: "Something went wrong!"
                  }]
                });

              case 20:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, undefined, [[0, 16]]);
      }));

      return function cancelBooking(_x22, _x23, _x24) {
        return _ref18.apply(this, arguments);
      };
    }(),
    deleteEvent: function () {
      var _ref21 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(_, _ref22, _ref23) {
        var eventId = _ref22.eventId;
        var _ref23$models = _ref23.models,
            Booking = _ref23$models.Booking,
            Event = _ref23$models.Event,
            authenticatedUser = _ref23.authenticatedUser;
        var isEventExist, seeIfBookingExist;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;

                if (authenticatedUser) {
                  _context9.next = 3;
                  break;
                }

                throw new Error("Authenticated required!");

              case 3:
                _context9.next = 5;
                return Event.findOne({
                  _id: eventId,
                  owner: authenticatedUser.id
                });

              case 5:
                isEventExist = _context9.sent;

                if (isEventExist) {
                  _context9.next = 8;
                  break;
                }

                return _context9.abrupt("return", {
                  success: false,
                  errors: [{
                    path: "event",
                    message: "Event not exist!"
                  }]
                });

              case 8:
                _context9.next = 10;
                return Booking.findOne({ event: eventId });

              case 10:
                seeIfBookingExist = _context9.sent;

                if (!seeIfBookingExist) {
                  _context9.next = 13;
                  break;
                }

                return _context9.abrupt("return", {
                  success: false,
                  errors: [{
                    path: "event",
                    message: "Event is Booked!"
                  }]
                });

              case 13:
                _context9.next = 15;
                return Event.findByIdAndDelete(eventId);

              case 15:
                return _context9.abrupt("return", { success: true, event: isEventExist });

              case 18:
                _context9.prev = 18;
                _context9.t0 = _context9["catch"](0);
                return _context9.abrupt("return", {
                  success: false,
                  errors: [{
                    path: "username",
                    message: "Something went wrong!"
                  }]
                });

              case 21:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, undefined, [[0, 18]]);
      }));

      return function deleteEvent(_x25, _x26, _x27) {
        return _ref21.apply(this, arguments);
      };
    }()
  },
  User: {
    createdEvents: function () {
      var _ref24 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(_ref25, _, _ref26) {
        var id = _ref25.id;
        var Event = _ref26.models.Event;
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return Event.find({ owner: id });

              case 2:
                return _context10.abrupt("return", _context10.sent);

              case 3:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, undefined);
      }));

      return function createdEvents(_x28, _x29, _x30) {
        return _ref24.apply(this, arguments);
      };
    }(),
    bookedEvents: function () {
      var _ref27 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(_ref28, _, _ref29) {
        var id = _ref28.id;
        var Event = _ref29.models.Event;
        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return Event.find({ bookedByUser: { $in: [id] } });

              case 2:
                return _context11.abrupt("return", _context11.sent);

              case 3:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, undefined);
      }));

      return function bookedEvents(_x31, _x32, _x33) {
        return _ref27.apply(this, arguments);
      };
    }()
  },
  Event: {
    owner: function () {
      var _ref30 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(_ref31, _, _ref32) {
        var _owner = _ref31.owner;
        var User = _ref32.models.User;
        return _regenerator2.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return User.findById(_owner);

              case 2:
                return _context12.abrupt("return", _context12.sent);

              case 3:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, undefined);
      }));

      return function owner(_x34, _x35, _x36) {
        return _ref30.apply(this, arguments);
      };
    }()
  }
};