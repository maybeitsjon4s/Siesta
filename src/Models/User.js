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
  money: {
    type: Number,
    default: 0
  },
  cooldowns: {
    daily: {
      type: Date,
      default: null
    },
    mine: {
      type: Date,
      default: null
    },
    work: {
      type: Date,
      default: null
    }
  },
  blacklist: {
    type: Boolean,
    default: false
  },
  vip: {
    type: Boolean,
    default: false
  },
  itens: {
    picareta: {
    type: Boolean,
    default: false
  },
  },
  mine: {
    esmeraldas: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    exp: { type: Number, default: 0 }
  },
  lastCommandUsed: {
    type: Date, default: null
  }
});

const User = mongoose.model("Users", userSchema);
module.exports = User;