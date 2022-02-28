require("colors");

const yaml = require('js-yaml');
const { readFileSync } = require('fs');

global.yml = yaml.load(readFileSync('./env.yml', 'utf8'));

const { connect } = require("mongoose")
connect(yml.database, { useNewUrlParser: true, useUnifiedTopology: true }).catch(console.error)

const SiestaClient = require('./Structures/SiestaClient');
const client = new SiestaClient();

client.login();

process.on("unhandledRejection", (reason, p) => {
    if (String(reason).includes("Shards are still being spawned") || String(reason).includes("Missing Permissions")) return;
    console.log("\n\n");
    console.log(String(reason.stack).gray);
    console.log("\n\n");
  });
  process.on("uncaughtException", (err, origin) => {
    console.log("\n\n");
    console.log(String(err.stack).gray);
    console.log("\n\n");
  })
