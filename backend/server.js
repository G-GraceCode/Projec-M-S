import express from "express";
import MongoConnect from "./connectDB/connectDB.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import userRouters from "./routes/userRouters.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const Port = process.env.PORT || 5000;

MongoConnect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(Port, (req, res) => {
  console.log(`Port ${Port} running`);
});

app.use("/projec/user", userRouters);

app.get("/", (req, res) => {
  res.status(200).send("Welcom to the MERN Stack");
});

app.post("/projec", (req, res) => {
  res.status(200).json({ message: "App going well" });
});

app.use(notFound);
app.use(errorHandler);
