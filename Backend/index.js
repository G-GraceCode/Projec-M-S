const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).send("Welcome on Projec");
});

Port = process.env.PORT || 3000;

app.listen(Port, () => {
  console.log(`Your ${Port} is running`);
});
