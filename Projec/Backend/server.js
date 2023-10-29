import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRouters.js";
import cors from "cors";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();

const Port = process.env.PORT || 7000;

// initializations
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).send("Welcome on Projec");
});

app.use("/api/users", userRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(Port, () => {
  console.log(`Your ${Port} is running`);
});

// connecting MongoDB DB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected Well");
  })
  .catch((e) => {
    console.error(e.message);
  });
