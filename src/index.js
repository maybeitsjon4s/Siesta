require("dotenv/config");
const SiestaClient = require('./Structures/SiestaClient')
const client = new SiestaClient()
client.login()
module.exports = client;

process.on("unhandledRejection", console.error)
