// Import Dependencies
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
// Creating a Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username field is required!"],
      trim: true,
      lowercase: true
    },
    email: {
      type: String,
      required: [true, "Email field is required!"],
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: [true, "Password field is required!"],
      trim: true
    },
    createdEvents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
      }
    ]
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", async function(next) {
  const user = this;
  if (!user.isModified()) return next();
  user.password = await bcrypt.hash(user.password, 12);
  next();
});

// Export Model
export default mongoose.model("User", userSchema);
