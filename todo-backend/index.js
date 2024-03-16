const cors = require("cors");
const todos = require("./routes/todos");
const signUp = require("./routes/signUp");
const signIn = require("./routes/signIn");
const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/todos", todos);
app.use("/api/signup", signUp);
app.use("/api/signin", signIn);

app.get("/", (req, res) => {
  res.send("Hello from ToDo App");
});

const uri = process.env.MONGODB_URL;
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));
