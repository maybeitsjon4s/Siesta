import pkg from 'mongoose';
const { Schema, model } = pkg;

export default model('Users', new Schema({
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
}));
