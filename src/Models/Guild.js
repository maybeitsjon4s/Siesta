const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const guildSchema = new Schema({
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

const Guild = mongoose.model("Guilds", guildSchema);

module.exports = Guild;