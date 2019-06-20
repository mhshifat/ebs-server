// Import Dependencies
import mongoose from "mongoose";

// Creating a Schema
const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event"
    }
  },
  {
    timestamps: true
  }
);

// Export Model
export default mongoose.model("Booking", bookingSchema);
