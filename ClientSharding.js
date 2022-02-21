require("dotenv/config")
const { ShardingManager } = require("discord.js"),
  manager = new ShardingManager('./src/index.js', {
    token: process.env.TOKEN,
    totalShards: 2,
    respawn: true,
  });
manager.spawn()

process.on("unhandledRejection", (reason, p) => {
    if (
      String(reason).includes("Shards are still being spawned") ||
      String(reason).includes("Missing Permissions")
    )
      return;
    console.log("\n\n\n\n\n=== unhandled Rejection ===".toUpperCase().gray);
    console.log(
      "Reason: ",
      reason.stack ? String(reason.stack).gray : String(reason).gray
    );
    console.log("=== unhandled Rejection ===\n\n\n\n\n".toUpperCase().gray);
  });
  process.on("uncaughtException", (err, origin) => {
    console.log("\n\n\n\n\n\n=== uncaught Exception ===".toUpperCase().gray);
    console.log("Exception: ", err.stack ? err.stack : err);
    console.log("=== uncaught Exception ===\n\n\n\n\n".toUpperCase().gray);
  });
