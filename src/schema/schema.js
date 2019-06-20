export default `
  type Booking {
    id: ID!
    user: User!
    event: Event!
    createdAt: String!
  }

  type Event {
    id: ID!
    name: String!
    description: String!
    price: Float!
    date: String!
    owner: User!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    createdEvents: [Event!]!
    bookedEvents: [Event!]!
  }

  type Error {
    path: String!
    message: String!
  }

  type LoginResponse {
    success: Boolean!
    token: String
    errors: [Error!]
  }

  type RegisterResponse {
    success: Boolean!
    errors: [Error!]
  }

  type CreateEventResponse {
    success: Boolean!
    event: Event
    errors: [Error!]
  }

  type BookEventResponse {
    success: Boolean!
    event: Event
    errors: [Error!]
  }

  type CancelEventResponse {
    success: Boolean!
    event: Event
    errors: [Error!]
  }

  type DeleteEventResponse {
    success: Boolean!
    event: Event
    errors: [Error!]
  }

  type Query {
    user: User!
    events: [Event!]!
    bookings: [Booking!]!
  }

  type Mutation {
    login(email: String!, password: String!): LoginResponse!
    register(username: String!, email: String!, password: String!): RegisterResponse!
    createEvent(name: String!, description: String!, price: Float!, date: String!): CreateEventResponse!
    deleteEvent(eventId: ID!): DeleteEventResponse!
    bookEvent(eventId: ID!): BookEventResponse!
    cancelBooking(eventId: ID!): CancelEventResponse!
  }
`;
