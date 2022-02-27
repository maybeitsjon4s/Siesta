require("dotenv/config");
require("colors");

const { connect } = require("mongoose")
connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }).catch(console.error)

const SiestaClient = require('./Structures/SiestaClient');
const client = new SiestaClient();

client.login();
