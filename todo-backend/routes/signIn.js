const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "failure",
      message: "email and password required",
    });
  }

  let user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      status: "failure",
      message: "Invalid email or password...",
    });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({
      status: "failure",
      message: "Invalid email or password...",
    });
  }

  const jwtSecretKey = process.env.TODO_APP_JWT_SECRET_KEY;
  const token = jwt.sign(
    { _id: user._id, name: user.name, email: user.email },
    jwtSecretKey
  );

  res.send(token);
});

module.exports = router;
