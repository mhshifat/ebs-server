// Import Dependencies
import mongoose from "mongoose";

// Creating a Schema
const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Event name is required!"],
      trim: true,
      unique: true
    },
    description: {
      type: String,
      required: [true, "Event description is required!"],
      trim: true
    },
    price: {
      type: Number,
      required: [true, "Event price is required!"],
      trim: true
    },
    date: {
      type: Date,
      required: [true, "Event date is required!"]
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    bookedByUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  {
    timestamps: true
  }
);

// Export Model
export default mongoose.model("Event", eventSchema);
