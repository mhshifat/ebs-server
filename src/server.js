import { GraphQLServer } from "graphql-yoga";
import isAuthenticated from "./middlewares/isAuthenticated";
import Booking from "./models/Booking";
import Event from "./models/Event";
import User from "./models/User";
import resolvers from "./resolvers/resolvers";
import typeDefs from "./schema/schema";

require("./database/conn");

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: ({ request: req, response: res }) => ({
    req,
    res,
    models: {
      User,
      Event,
      Booking
    },
    authenticatedUser: null
  }),
  middlewares: [isAuthenticated]
});

server.start(
  {
    port: process.env.PORT || 5000,
    endpoint: "/graphql"
  },
  () => {
    console.log(`==> The server is running on http://localhost:5000`);
  }
);
