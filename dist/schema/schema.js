"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = "\n  type Booking {\n    id: ID!\n    user: User!\n    event: Event!\n    createdAt: String!\n  }\n\n  type Event {\n    id: ID!\n    name: String!\n    description: String!\n    price: Float!\n    date: String!\n    owner: User!\n  }\n\n  type User {\n    id: ID!\n    username: String!\n    email: String!\n    createdEvents: [Event!]!\n    bookedEvents: [Event!]!\n  }\n\n  type Error {\n    path: String!\n    message: String!\n  }\n\n  type LoginResponse {\n    success: Boolean!\n    token: String\n    errors: [Error!]\n  }\n\n  type RegisterResponse {\n    success: Boolean!\n    errors: [Error!]\n  }\n\n  type CreateEventResponse {\n    success: Boolean!\n    event: Event\n    errors: [Error!]\n  }\n\n  type BookEventResponse {\n    success: Boolean!\n    event: Event\n    errors: [Error!]\n  }\n\n  type CancelEventResponse {\n    success: Boolean!\n    event: Event\n    errors: [Error!]\n  }\n\n  type DeleteEventResponse {\n    success: Boolean!\n    event: Event\n    errors: [Error!]\n  }\n\n  type Query {\n    user: User!\n    events: [Event!]!\n    bookings: [Booking!]!\n  }\n\n  type Mutation {\n    login(email: String!, password: String!): LoginResponse!\n    register(username: String!, email: String!, password: String!): RegisterResponse!\n    createEvent(name: String!, description: String!, price: Float!, date: String!): CreateEventResponse!\n    deleteEvent(eventId: ID!): DeleteEventResponse!\n    bookEvent(eventId: ID!): BookEventResponse!\n    cancelBooking(eventId: ID!): CancelEventResponse!\n  }\n";
exports["default"] = _default;