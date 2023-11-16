import express from "express";
import MongoConnect from "./connectDB/connectDB.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";
import userRouters from "./routes/userRouters.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const Port = process.env.PORT || 5000;

MongoConnect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
app.use(
  cors({
    origin: ["https://tnmwcq-4000.csb.app"],
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

app.get("/", (req, res) => {
  res.status(200).send("Welcom to the MERN Stack");
});

app.post("/projec", (req, res) => {
  res.status(200).json({ message: "App going well" });
});

app.use(notFound);
app.use(errorHandler);
