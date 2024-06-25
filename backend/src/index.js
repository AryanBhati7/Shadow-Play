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
