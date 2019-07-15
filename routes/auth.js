const express = require("express");
const User = require("../models/Users");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require('../middleware/auth');
require("dotenv").config();
const JWT_ID = process.env.JWT_ID;


// LOGIN USER
router.post("/", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json("Please Enter All Fields");
  }

  User.findOne({ username }).then(user => {
    if (!user) return res.status(400).json("User Does Not Exist ");

    // Validate Password
    bcrypt.compare(password, user.password)
    .then(isMatch => {
        if (!isMatch){
            return res.status(400).json('Password is Incorrect')
        }
        jwt.sign(
            {id: user.id}, 
            JWT_ID,
            {expiresIn: 3600},
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: {
                        _id: user.id,
                        username: user.username,
                        email: user.email
                    }
                    
                    
                })
            })
    })



  });
});

// Validates user by web token, get req.user from middleware
router.get("/user", auth, (req, res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
})

module.exports = router;
