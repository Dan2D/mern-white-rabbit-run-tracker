const express = require("express");
const User = require("../models/Users");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_ID = process.env.JWT_ID;


// REGISTER USER
router.post("/", (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  if (!username || !email || !password) {
    return res.status(400).json("Please enter all fields");
  }
  console.log("Please enter all fields passed");
  if (!(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi).test(email)){
    return res.status(400).json("Please enter valid email address");
  }
  console.log("Please enter valid email passed");
  if (!(/^[A-Z0-9\.]{3,12}/gi).test(username)){
    return res.status(400).json("Please enter valid username");
  }
  console.log("Please enter valid username passed");

  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json("User Email Already Exists");
    console.log("User email already exists passed");
    const newUser = User({
      username,
      email,
      password
    });
    console.log("created new user passed");
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            JWT_ID,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  _id: user.id,
                  username: user.username,
                  email: user.email
                }
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
