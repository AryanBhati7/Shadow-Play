import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB Connected !! DB HOST : ${connectionInstance.connection.host} `
    );
  } catch (error) {
    console.log("MONGODB could not be connected :", error);
    process.exit(1); //diff ways to exit code in NodeJs
  }
};

export default connectDB;
