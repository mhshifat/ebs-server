"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _default = {
  Query: {
    user: function () {
      var _user = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(_, __, _ref) {
        var User, authenticatedUser;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                User = _ref.models.User, authenticatedUser = _ref.authenticatedUser;

                if (authenticatedUser) {
                  _context.next = 3;
                  break;
                }

                throw new Error("Authenticated required!");

              case 3:
                _context.next = 5;
                return User.findById(authenticatedUser.id);

              case 5:
                return _context.abrupt("return", _context.sent);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function user(_x, _x2, _x3) {
        return _user.apply(this, arguments);
      }

      return user;
    }(),
    events: function () {
      var _events = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(_, __, _ref2) {
        var _ref2$models, Event, Booking, authenticatedUser, bookedEvents, bookedEventsList, events;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _ref2$models = _ref2.models, Event = _ref2$models.Event, Booking = _ref2$models.Booking, authenticatedUser = _ref2.authenticatedUser;
                _context2.next = 3;
                return Booking.find({
                  user: authenticatedUser.id
                });

              case 3:
                bookedEvents = _context2.sent;
                bookedEventsList = bookedEvents.reduce(function (acc, val) {
                  acc.push(val.event);
                  return acc;
                }, []);
                _context2.next = 7;
                return Event.find({
                  _id: {
                    $nin: bookedEventsList
                  }
                });

              case 7:
                events = _context2.sent;
                return _context2.abrupt("return", events);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function events(_x4, _x5, _x6) {
        return _events.apply(this, arguments);
      }

      return events;
    }(),
    bookings: function () {
      var _bookings = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(_, __, _ref3) {
        var Booking, authenticatedUser;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                Booking = _ref3.models.Booking, authenticatedUser = _ref3.authenticatedUser;

                if (authenticatedUser) {
                  _context3.next = 3;
                  break;
                }

                throw new Error("Authenticated required!");

              case 3:
                _context3.next = 5;
                return Booking.find({
                  user: authenticatedUser.id
                }).populate("user event");

              case 5:
                return _context3.abrupt("return", _context3.sent);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function bookings(_x7, _x8, _x9) {
        return _bookings.apply(this, arguments);
      }

      return bookings;
    }()
  },
  Mutation: {
    login: function () {
      var _login = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(_, _ref4, _ref5) {
        var email, password, User, findUser, isPwdMatched, token;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                email = _ref4.email, password = _ref4.password;
                User = _ref5.models.User;
                _context4.prev = 2;
                _context4.next = 5;
                return User.findOne({
                  email: email
                });

              case 5:
                findUser = _context4.sent;

                if (findUser) {
                  _context4.next = 8;
                  break;
                }

                return _context4.abrupt("return", {
                  success: false,
                  errors: [{
                    path: "email",
                    message: "User not exist!"
                  }]
                });

              case 8:
                _context4.next = 10;
                return _bcryptjs["default"].compare(password, findUser.password);

              case 10:
                isPwdMatched = _context4.sent;

                if (isPwdMatched) {
                  _context4.next = 13;
                  break;
                }

                return _context4.abrupt("return", {
                  success: false,
                  errors: [{
                    path: "password",
                    message: "Password not matched!"
                  }]
                });

              case 13:
                token = _jsonwebtoken["default"].sign({
                  id: findUser.id,
                  username: findUser.username,
                  email: findUser.email
                }, "MySuperSecretPassword", {
                  expiresIn: "1d"
                });
                return _context4.abrupt("return", {
                  success: true,
                  token: token
                });

              case 17:
                _context4.prev = 17;
                _context4.t0 = _context4["catch"](2);
                return _context4.abrupt("return", {
                  success: false,
                  errors: [{
                    path: "username",
                    message: "Something went wrong!"
                  }]
                });

              case 20:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[2, 17]]);
      }));

      function login(_x10, _x11, _x12) {
        return _login.apply(this, arguments);
      }

      return login;
    }(),
    register: function () {
      var _register = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(_, args, _ref6) {
        var User;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                User = _ref6.models.User;
                _context5.prev = 1;
                _context5.next = 4;
                return User.create(args);

              case 4:
                return _context5.abrupt("return", {
                  success: true
                });

              case 7:
                _context5.prev = 7;
                _context5.t0 = _context5["catch"](1);
                return _context5.abrupt("return", {
                  success: false,
                  errors: [{
                    path: "username",
                    message: "Something went wrong!"
                  }]
                });

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[1, 7]]);
      }));

      function register(_x13, _x14, _x15) {
        return _register.apply(this, arguments);
      }

      return register;
    }(),
    createEvent: function () {
      var _createEvent = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(_, _ref7, _ref8) {
        var name, otherArgs, _ref8$models, Event, User, authenticatedUser, findEvent, event, findUser;

        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                name = _ref7.name, otherArgs = (0, _objectWithoutProperties2["default"])(_ref7, ["name"]);
                _ref8$models = _ref8.models, Event = _ref8$models.Event, User = _ref8$models.User, authenticatedUser = _ref8.authenticatedUser;
                _context6.prev = 2;

                if (authenticatedUser) {
                  _context6.next = 5;
                  break;
                }

                throw new Error("Authenticated required!");

              case 5:
                _context6.next = 7;
                return Event.findOne({
                  name: name
                });

              case 7:
                findEvent = _context6.sent;

                if (!findEvent) {
                  _context6.next = 10;
                  break;
                }

                return _context6.abrupt("return", {
                  success: false,
                  errors: [{
                    path: "name",
                    message: "Event name has taken!"
                  }]
                });

              case 10:
                _context6.next = 12;
                return Event.create((0, _objectSpread2["default"])({
                  name: name
                }, otherArgs, {
                  owner: authenticatedUser.id
                }));

              case 12:
                event = _context6.sent;
                _context6.next = 15;
                return User.findById(authenticatedUser.id);

              case 15:
                findUser = _context6.sent;
                findUser.createdEvents.push(event);
                findUser.save();
                return _context6.abrupt("return", {
                  success: true,
                  event: event
                });

              case 21:
                _context6.prev = 21;
                _context6.t0 = _context6["catch"](2);
                console.log(_context6.t0);
                return _context6.abrupt("return", {
                  success: false,
                  errors: [{
                    path: "username",
                    message: "Something went wrong!"
                  }]
                });

              case 25:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[2, 21]]);
      }));

      function createEvent(_x16, _x17, _x18) {
        return _createEvent.apply(this, arguments);
      }

      return createEvent;
    }(),
    bookEvent: function () {
      var _bookEvent = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee7(_, _ref9, _ref10) {
        var eventId, _ref10$models, Booking, Event, authenticatedUser, isBookingExist, findEvent;

        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                eventId = _ref9.eventId;
                _ref10$models = _ref10.models, Booking = _ref10$models.Booking, Event = _ref10$models.Event, authenticatedUser = _ref10.authenticatedUser;
                _context7.prev = 2;

                if (authenticatedUser) {
                  _context7.next = 5;
                  break;
                }

                throw new Error("Authenticated required!");

              case 5:
                _context7.next = 7;
                return Booking.findOne({
                  event: eventId
                });

              case 7:
                isBookingExist = _context7.sent;

                if (!isBookingExist) {
                  _context7.next = 10;
                  break;
                }

                return _context7.abrupt("return", {
                  success: false,
                  errors: [{
                    path: "event",
                    message: "You booked it before!"
                  }]
                });

              case 10:
                _context7.next = 12;
                return Event.findById(eventId);

              case 12:
                findEvent = _context7.sent;

                if (!(String(findEvent.owner) === authenticatedUser.id)) {
                  _context7.next = 15;
                  break;
                }

                return _context7.abrupt("return", {
                  success: false,
                  errors: [{
                    path: "event",
                    message: "Can't book your own event!"
                  }]
                });

              case 15:
                if (findEvent) {
                  _context7.next = 17;
                  break;
                }

                return _context7.abrupt("return", {
                  success: false,
                  errors: [{
                    path: "event",
                    message: "Event not exist!"
                  }]
                });

              case 17:
                _context7.next = 19;
                return Booking.create({
                  user: authenticatedUser.id,
                  event: eventId
                });

              case 19:
                return _context7.abrupt("return", {
                  success: true,
                  event: findEvent
                });

              case 22:
                _context7.prev = 22;
                _context7.t0 = _context7["catch"](2);
                return _context7.abrupt("return", {
                  success: false,
                  errors: [{
                    path: "username",
                    message: "Something went wrong!"
                  }]
                });

              case 25:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[2, 22]]);
      }));

      function bookEvent(_x19, _x20, _x21) {
        return _bookEvent.apply(this, arguments);
      }

      return bookEvent;
    }(),
    cancelBooking: function () {
      var _cancelBooking = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee8(_, _ref11, _ref12) {
        var eventId, _ref12$models, Booking, Event, authenticatedUser, isBookingExist, findEvent;

        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                eventId = _ref11.eventId;
                _ref12$models = _ref12.models, Booking = _ref12$models.Booking, Event = _ref12$models.Event, authenticatedUser = _ref12.authenticatedUser;
                _context8.prev = 2;

                if (authenticatedUser) {
                  _context8.next = 5;
                  break;
                }

                throw new Error("Authenticated required!");

              case 5:
                _context8.next = 7;
                return Booking.findOne({
                  event: eventId,
                  user: authenticatedUser.id
                });

              case 7:
                isBookingExist = _context8.sent;

                if (isBookingExist) {
                  _context8.next = 10;
                  break;
                }

                return _context8.abrupt("return", {
                  success: false,
                  errors: [{
                    path: "booking",
                    message: "Booking not exist!"
                  }]
                });

              case 10:
                _context8.next = 12;
                return Event.findById(eventId);

              case 12:
                findEvent = _context8.sent;
                _context8.next = 15;
                return Booking.findOneAndDelete({
                  event: eventId
                });

              case 15:
                return _context8.abrupt("return", {
                  success: true,
                  event: findEvent
                });

              case 18:
                _context8.prev = 18;
                _context8.t0 = _context8["catch"](2);
                console.log(_context8.t0);
                return _context8.abrupt("return", {
                  success: false,
                  errors: [{
                    path: "username",
                    message: "Something went wrong!"
                  }]
                });

              case 22:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[2, 18]]);
      }));

      function cancelBooking(_x22, _x23, _x24) {
        return _cancelBooking.apply(this, arguments);
      }

      return cancelBooking;
    }(),
    deleteEvent: function () {
      var _deleteEvent = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee9(_, _ref13, _ref14) {
        var eventId, _ref14$models, Booking, Event, authenticatedUser, isEventExist, seeIfBookingExist;

        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                eventId = _ref13.eventId;
                _ref14$models = _ref14.models, Booking = _ref14$models.Booking, Event = _ref14$models.Event, authenticatedUser = _ref14.authenticatedUser;
                _context9.prev = 2;

                if (authenticatedUser) {
                  _context9.next = 5;
                  break;
                }

                throw new Error("Authenticated required!");

              case 5:
                _context9.next = 7;
                return Event.findOne({
                  _id: eventId,
                  owner: authenticatedUser.id
                });

              case 7:
                isEventExist = _context9.sent;

                if (isEventExist) {
                  _context9.next = 10;
                  break;
                }

                return _context9.abrupt("return", {
                  success: false,
                  errors: [{
                    path: "event",
                    message: "Event not exist!"
                  }]
                });

              case 10:
                _context9.next = 12;
                return Booking.findOne({
                  event: eventId
                });

              case 12:
                seeIfBookingExist = _context9.sent;

                if (!seeIfBookingExist) {
                  _context9.next = 15;
                  break;
                }

                return _context9.abrupt("return", {
                  success: false,
                  errors: [{
                    path: "event",
                    message: "Event is Booked!"
                  }]
                });

              case 15:
                _context9.next = 17;
                return Event.findByIdAndDelete(eventId);

              case 17:
                return _context9.abrupt("return", {
                  success: true,
                  event: isEventExist
                });

              case 20:
                _context9.prev = 20;
                _context9.t0 = _context9["catch"](2);
                return _context9.abrupt("return", {
                  success: false,
                  errors: [{
                    path: "username",
                    message: "Something went wrong!"
                  }]
                });

              case 23:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[2, 20]]);
      }));

      function deleteEvent(_x25, _x26, _x27) {
        return _deleteEvent.apply(this, arguments);
      }

      return deleteEvent;
    }()
  },
  User: {
    createdEvents: function () {
      var _createdEvents = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee10(_ref15, _, _ref16) {
        var id, Event;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                id = _ref15.id;
                Event = _ref16.models.Event;
                _context10.next = 4;
                return Event.find({
                  owner: id
                });

              case 4:
                return _context10.abrupt("return", _context10.sent);

              case 5:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function createdEvents(_x28, _x29, _x30) {
        return _createdEvents.apply(this, arguments);
      }

      return createdEvents;
    }(),
    bookedEvents: function () {
      var _bookedEvents = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee11(_ref17, _, _ref18) {
        var id, Event;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                id = _ref17.id;
                Event = _ref18.models.Event;
                _context11.next = 4;
                return Event.find({
                  bookedByUser: {
                    $in: [id]
                  }
                });

              case 4:
                return _context11.abrupt("return", _context11.sent);

              case 5:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      function bookedEvents(_x31, _x32, _x33) {
        return _bookedEvents.apply(this, arguments);
      }

      return bookedEvents;
    }()
  },
  Event: {
    owner: function () {
      var _owner2 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee12(_ref19, _, _ref20) {
        var _owner, User;

        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _owner = _ref19.owner;
                User = _ref20.models.User;
                _context12.next = 4;
                return User.findById(_owner);

              case 4:
                return _context12.abrupt("return", _context12.sent);

              case 5:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }));

      function owner(_x34, _x35, _x36) {
        return _owner2.apply(this, arguments);
      }

      return owner;
    }()
  }
};
exports["default"] = _default;