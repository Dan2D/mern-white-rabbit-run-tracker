const express = require("express");
const Settings = require("../models/Settings");
const router = express.Router();
const auth = require('../middleware/auth');


// Register New user settings 
router.post("/register/:id", (req, res) => {
  const {username} = req.body
  const newSettings = new Settings({
    _id: req.params.id,
    user: username
  })
  console.log(newSettings)
  newSettings.save()
  .then(settings => res.json(settings))
  .catch(err => res.status(400).json(`Error: ${err}`))
})
 
// Get user Settings (WORKING)
router.get("/:id", auth, (req, res) => { 
    console.log()
   Settings.findById(req.params.id)
    .then(settings => res.json(settings))
    .catch(err => res.status(400).json(`ERROR: ${err}`))
});

// Update Goal (WORKING)
router.patch("/", (req, res) => {
  const {
    userID,
    distUnits
  } = req.body;
  console.log(req.body)
  Settings.findById(userID)
  .then(settings => {
      settings.set({distUnits})
      console.log(settings)
      settings.save()
      .then(settings => res.json(settings))
  })
  .catch(err => res.status(400).json(`ERROR: ${err}`))
});


module.exports = router;
