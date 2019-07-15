const mongoose = require("mongoose");

const settingsSchema = mongoose.Schema({
  _id: String,
  user: String,
  distUnits: {
    type: String,
    required: true,
    default: "mi"
  }
});

module.exports = mongoose.model("Settings", settingsSchema);
