// require("dotenv").config({path : './env'})

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 8000;

app.on("error", (error) => {
  console.log("Server Run Failed :", error);
  throw error;
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`  ⚙️   Server is running at port : ${port}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Connection Failed !! ", err);
  });

/*
Other way to connect DB
import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import express from "express";

const app = express();

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("ERROR :", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("ERROR :", error);
  }
})();
*/
