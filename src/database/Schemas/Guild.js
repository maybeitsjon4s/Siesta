const { Schema } = require("mongoose");
const mongoose = require("mongoose");

let guildSchema = new Schema({
  _id: {
    type: String
  },
  prefix: {
    type: String,
    default: "<"
  },
  lang: {
    type: Number,
    default: null
  },
  logs: {
    type: String,
    default: null
  },
  antiinvite: {
    status: {
      type: Boolean,
      default: false
    },
    whitelist: {
      type: Array,
      default: []
    }
  },
  welcome: {
    status: {
      type: Boolean,
      default: false
    },
    channel: {
      type: String,
      default: null
    },
    message: {
      type: String,
      default: null
    }
  }
});

let Guild = mongoose.model("Guilds", guildSchema);
module.exports = Guild;