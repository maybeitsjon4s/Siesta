const { Schema, model } = require('mongoose');
module.exports = model('Guilds', new Schema({
    _id: {
        type: String
    },
    prefix: {
        type: String,
        default: '<'
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
    },
    autorole: {
        status: {
            type: Boolean, default: false
        },
        roles: {
            type: Array, default: []
        }
    }
}));
