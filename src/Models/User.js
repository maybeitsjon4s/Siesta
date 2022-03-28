const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const userSchema = new Schema({
  _id: {
    type: String,
    default: null
  },
  about: {
    type: String,
    default: null
  },
  blacklist: {
    type: Boolean,
    default: false
  },
  lastCommandUsed: {
    type: Date, default: null
  }
});

const User = mongoose.model("Users", userSchema);
module.exports = User;
