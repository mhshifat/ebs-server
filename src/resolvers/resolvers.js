import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default {
  Query: {
    user: async (_, __, { models: { User }, authenticatedUser }) => {
      if (!authenticatedUser) throw new Error("Authenticated required!");
      return await User.findById(authenticatedUser.id);
    },
    events: async (
      _,
      __,
      { models: { Event, Booking }, authenticatedUser }
    ) => {
      const bookedEvents = await Booking.find({
        user: authenticatedUser.id
      });
      const bookedEventsList = bookedEvents.reduce((acc, val) => {
        acc.push(val.event);
        return acc;
      }, []);
      const events = await Event.find({
        _id: { $nin: bookedEventsList }
      });
      return events;
    },
    bookings: async (_, __, { models: { Booking }, authenticatedUser }) => {
      if (!authenticatedUser) throw new Error("Authenticated required!");
      return await Booking.find({ user: authenticatedUser.id }).populate(
        "user event"
      );
    }
  },
  Mutation: {
    login: async (_, { email, password }, { models: { User } }) => {
      try {
        const findUser = await User.findOne({ email });
        if (!findUser) {
          return {
            success: false,
            errors: [
              {
                path: "email",
                message: "User not exist!"
              }
            ]
          };
        }
        const isPwdMatched = await bcrypt.compare(password, findUser.password);
        if (!isPwdMatched) {
          return {
            success: false,
            errors: [
              {
                path: "password",
                message: "Password not matched!"
              }
            ]
          };
        }
        const token = jwt.sign(
          {
            id: findUser.id,
            username: findUser.username,
            email: findUser.email
          },
          "MySuperSecretPassword",
          { expiresIn: "1d" }
        );
        return { success: true, token };
      } catch (err) {
        return {
          success: false,
          errors: [
            {
              path: "username",
              message: "Something went wrong!"
            }
          ]
        };
      }
    },
    register: async (_, args, { models: { User } }) => {
      try {
        await User.create(args);
        return { success: true };
      } catch (err) {
        return {
          success: false,
          errors: [
            {
              path: "username",
              message: "Something went wrong!"
            }
          ]
        };
      }
    },
    createEvent: async (
      _,
      { name, ...otherArgs },
      { models: { Event, User }, authenticatedUser }
    ) => {
      try {
        if (!authenticatedUser) throw new Error("Authenticated required!");
        const findEvent = await Event.findOne({ name });
        if (findEvent) {
          return {
            success: false,
            errors: [
              {
                path: "name",
                message: "Event name has taken!"
              }
            ]
          };
        }
        const event = await Event.create({
          name,
          ...otherArgs,
          owner: authenticatedUser.id
        });
        const findUser = await User.findById(authenticatedUser.id);
        findUser.createdEvents.push(event);
        findUser.save();
        return { success: true, event };
      } catch (err) {
        console.log(err);
        return {
          success: false,
          errors: [
            {
              path: "username",
              message: "Something went wrong!"
            }
          ]
        };
      }
    },
    bookEvent: async (
      _,
      { eventId },
      { models: { Booking, Event }, authenticatedUser }
    ) => {
      try {
        if (!authenticatedUser) throw new Error("Authenticated required!");
        const isBookingExist = await Booking.findOne({ event: eventId });
        if (isBookingExist) {
          return {
            success: false,
            errors: [
              {
                path: "event",
                message: "You booked it before!"
              }
            ]
          };
        }
        const findEvent = await Event.findById(eventId);
        if (String(findEvent.owner) === authenticatedUser.id) {
          return {
            success: false,
            errors: [
              {
                path: "event",
                message: "Can't book your own event!"
              }
            ]
          };
        }
        if (!findEvent) {
          return {
            success: false,
            errors: [
              {
                path: "event",
                message: "Event not exist!"
              }
            ]
          };
        }
        await Booking.create({
          user: authenticatedUser.id,
          event: eventId
        });
        return { success: true, event: findEvent };
      } catch (err) {
        return {
          success: false,
          errors: [
            {
              path: "username",
              message: "Something went wrong!"
            }
          ]
        };
      }
    },
    cancelBooking: async (
      _,
      { eventId },
      { models: { Booking, Event }, authenticatedUser }
    ) => {
      try {
        if (!authenticatedUser) throw new Error("Authenticated required!");
        const isBookingExist = await Booking.findOne({
          event: eventId,
          user: authenticatedUser.id
        });
        if (!isBookingExist) {
          return {
            success: false,
            errors: [
              {
                path: "booking",
                message: "Booking not exist!"
              }
            ]
          };
        }
        const findEvent = await Event.findById(eventId);
        await Booking.findOneAndDelete({ event: eventId });
        return { success: true, event: findEvent };
      } catch (err) {
        console.log(err);
        return {
          success: false,
          errors: [
            {
              path: "username",
              message: "Something went wrong!"
            }
          ]
        };
      }
    },
    deleteEvent: async (
      _,
      { eventId },
      { models: { Booking, Event }, authenticatedUser }
    ) => {
      try {
        if (!authenticatedUser) throw new Error("Authenticated required!");
        const isEventExist = await Event.findOne({
          _id: eventId,
          owner: authenticatedUser.id
        });
        if (!isEventExist) {
          return {
            success: false,
            errors: [
              {
                path: "event",
                message: "Event not exist!"
              }
            ]
          };
        }
        const seeIfBookingExist = await Booking.findOne({ event: eventId });
        if (seeIfBookingExist) {
          return {
            success: false,
            errors: [
              {
                path: "event",
                message: "Event is Booked!"
              }
            ]
          };
        }
        await Event.findByIdAndDelete(eventId);
        return { success: true, event: isEventExist };
      } catch (err) {
        return {
          success: false,
          errors: [
            {
              path: "username",
              message: "Something went wrong!"
            }
          ]
        };
      }
    }
  },
  User: {
    createdEvents: async ({ id }, _, { models: { Event } }) =>
      await Event.find({ owner: id }),
    bookedEvents: async ({ id }, _, { models: { Event } }) =>
      await Event.find({ bookedByUser: { $in: [id] } })
  },
  Event: {
    owner: async ({ owner }, _, { models: { User } }) =>
      await User.findById(owner)
  }
};
