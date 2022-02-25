require("dotenv/config");
require("colors");
const SiestaClient = require('./Structures/SiestaClient');
const client = new SiestaClient();
client.login();
module.exports = client;
