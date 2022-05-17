import pkg from 'mongoose';
const { Schema, model } = pkg;

export default model('Guilds', new Schema({
  _id: { type: String },
  prefix: { type: String, default: '<' },
  lang: { type: Number, default: 0 },
  antiinvite: {
    status: { type: Boolean, default: false },
    whitelist: { type: Array, default: [] }
  },
  welcome: {
    status: { type: Boolean, default: false },
    channel: { type: String, default: null },
    message: { type: String, default: null }
  },
  autorole: {
    status: { type: Boolean, default: false },
    roles: { type: Array, default: [] }
  },
  warns: { type: Object, default: {} }
}));
