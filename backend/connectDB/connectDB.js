import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGODB_URI = process.env.DB_URI;

const MongoConnect = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (conn) {
      console.log("mongoose connected");
    }
  } catch (e) {
    console.log({ message: e.message });
  }
};

export default MongoConnect;
