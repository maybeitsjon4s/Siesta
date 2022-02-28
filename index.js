const yaml = require('js-yaml');
const { readFileSync } = require('fs');

yml = yaml.load(readFileSync('./env.yml', 'utf8'));

const { ShardingManager } = require("discord.js"),
  manager = new ShardingManager('./src/index.js', {
    token: yml.token,
    totalShards: 2,
    respawn: true,
  });
manager.spawn()

process.on("unhandledRejection", (reason, p) => {
    if (String(reason).includes("Shards are still being spawned") || String(reason).includes("Missing Permissions")) return;
    console.log("\n\n");
    console.log(reason.stack);
    console.log("\n\n");
  });
  process.on("uncaughtException", (err, origin) => {
    console.log("\n\n");
    console.log(err.stack);
    console.log("\n\n");
  })
