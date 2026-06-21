const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

// 🔥 FORCE EXACT FILE PATH
dotenv.config({ path: path.join(__dirname, "../.env") });

const connectDB = async () => {
  try {
    console.log("MONGO_URL =", process.env.MONGO_URL);

    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL not loaded. Check .env file path.");
    }

    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB Error:");
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;