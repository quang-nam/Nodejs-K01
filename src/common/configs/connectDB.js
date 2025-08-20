import mongoose from "mongoose";
import { MONGO_URI } from "./.environment.js";

function connectDB() {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
}
export default connectDB;
