import "dotenv/config"
import { ShardingManager } from "discord.js"

const manager = new ShardingManager('./src/index.js', {
  token: process.env.TOKEN,
  totalShards: "auto",
  respawn: true,
})

manager.spawn()

process.on("unhandledRejection", (reason, p) => {
  if (String(reason).includes("Shards are still being spawned") || String(reason).includes("Missing Permissions")) return
  console.log("\n\n")
  console.log(reason.stack)
  console.log("\n\n")
})

process.on("uncaughtException", (err, origin) => {
  console.log("\n\n")
  console.log("Exception" + err.stack)
  console.log("\n\n")
})
