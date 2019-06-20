"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _graphqlYoga = require("graphql-yoga");

var _isAuthenticated = _interopRequireDefault(require("./middlewares/isAuthenticated"));

var _Booking = _interopRequireDefault(require("./models/Booking"));

var _Event = _interopRequireDefault(require("./models/Event"));

var _User = _interopRequireDefault(require("./models/User"));

var _resolvers = _interopRequireDefault(require("./resolvers/resolvers"));

var _schema = _interopRequireDefault(require("./schema/schema"));

require("./database/conn");

var server = new _graphqlYoga.GraphQLServer({
  typeDefs: _schema["default"],
  resolvers: _resolvers["default"],
  context: function context(_ref) {
    var req = _ref.request,
        res = _ref.response;
    return {
      req: req,
      res: res,
      models: {
        User: _User["default"],
        Event: _Event["default"],
        Booking: _Booking["default"]
      },
      authenticatedUser: null
    };
  },
  middlewares: [_isAuthenticated["default"]]
});
server.start({
  port: process.env.PORT || 5000
}, function () {
  console.log("==> The server is running on http://localhost:5000");
});