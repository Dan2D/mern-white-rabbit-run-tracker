const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const goalsRoute = require('./routes/goals');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');

const app = express();
app.use(express.json());

const uri = process.env.MONGO_URI;

mongoose.connect(uri,{useNewUrlParser: true,
                        useCreateIndex: true})
.then(() => console.log("Connected to MONGO-DB!"))
.catch(err => console.log(`Error: ${err}`));


app.use("/goals", goalsRoute);
app.use("/users", usersRoute);
app.use("/auth", authRoute)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));