import express from "express";
import MongoConnect from "./connectDB/connectDB.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";
import userRouters from "./routes/userRouters.js";
import projectRouters from "./routes/projectRouters.js";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const Port = process.env.PORT || 5000;

// connecting to our database
MongoConnect();

const app = express();

app.use(express.json());

// handling the upload images endpoints (it works for all the images that shows image the frontend)
const __dirname = path.resolve();
const staticPath = path.join(__dirname, "uploads");
app.use("/uploads", express.static(staticPath));

// middleware to handle text from our body
app.use(express.urlencoded({ extended: true }));

// middleware to handle our methods
app.use(
  cors({
    origin: ["https://7wvkdh-4000.csb.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// Plays a roll in securing our routers in private access
app.use(cookieParser());

app.listen(Port, (req, res) => {
  console.log(`Port ${Port} running`);
});

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html")),
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running.....");
  });
}

app.use("/projec/user", userRouters);
app.use("/project", projectRouters);

app.get("/", (req, res) => {
  res.status(200).send("Welcom to the MERN Stack");
});

app.post("/projec", (req, res) => {
  res.status(200).json({ message: "App going well" });
});

app.use(notFound);
app.use(errorHandler);
