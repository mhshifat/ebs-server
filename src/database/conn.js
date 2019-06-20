// Import Dependencies
import mongoose from "mongoose";

// Import Environment Variables
require("dotenv").config();

// Setup Database Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, () => {
  console.log(`==> A database connection has been established`);
});
mongoose.set("useCreateIndex", true);
