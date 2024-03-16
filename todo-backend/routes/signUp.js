const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400)
      .json({
        status: "failure",
        message: "Email, and password are required...",
      });
  }

  let user = await User.findOne({ email });
  if (user) {
    return res.status(400)
      .json({
        status: "failure",
        message: "User already exists...",
      });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    const jwtSecretKey = process.env.TODO_APP_JWT_SECRET_KEY;
    const token = jwt.sign({ _id: user._id, name: user.name, email: user.email }, jwtSecretKey);

    res.send(token);
  } catch (error) {
    res.status(500).json({ data: { error: error.message } });
  }
});

module.exports = router;
