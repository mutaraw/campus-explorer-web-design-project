import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import route from "./routes/index.js";
import models from "./models/index.js";

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors());

route(app);


mongoose.connect("mongodb://localhost:27017/ourDB")

  export default app;
