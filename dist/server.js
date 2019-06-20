"use strict";

var _graphqlYoga = require("graphql-yoga");

var _isAuthenticated = require("./middlewares/isAuthenticated");

var _isAuthenticated2 = _interopRequireDefault(_isAuthenticated);

var _Booking = require("./models/Booking");

var _Booking2 = _interopRequireDefault(_Booking);

var _Event = require("./models/Event");

var _Event2 = _interopRequireDefault(_Event);

var _User = require("./models/User");

var _User2 = _interopRequireDefault(_User);

var _resolvers = require("./resolvers/resolvers");

var _resolvers2 = _interopRequireDefault(_resolvers);

var _schema = require("./schema/schema");

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("./database/conn");

var server = new _graphqlYoga.GraphQLServer({
  typeDefs: _schema2.default,
  resolvers: _resolvers2.default,
  context: function context(_ref) {
    var req = _ref.request,
        res = _ref.response;
    return {
      req: req,
      res: res,
      models: {
        User: _User2.default,
        Event: _Event2.default,
        Booking: _Booking2.default
      },
      authenticatedUser: null
    };
  },
  middlewares: [_isAuthenticated2.default]
});

server.start({
  port: process.env.PORT || 5000,
  endpoint: "/graphql"
}, function () {
  console.log("==> The server is running on http://localhost:5000");
});