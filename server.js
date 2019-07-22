const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const goalsRoute = require('./routes/goals');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const settingsRoute = require('./routes/settings');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")))

const uri = process.env.MONGO_URI;

mongoose.connect(uri,{useNewUrlParser: true,
                        useCreateIndex: true})
.then(() => console.log("Connected to MONGO-DB!"))
.catch(err => console.log(`Error: ${err}`));


app.use("/goals", goalsRoute);
app.use("/users", usersRoute);
app.use("/auth", authRoute)
app.use("/settings", settingsRoute);

const port = process.env.PORT || 5000;
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(port, () => console.log(`Server running on port ${port}`));