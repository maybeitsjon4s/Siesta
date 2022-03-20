const { promisify } = require('util')
const delay = promisify(setTimeout)
const { glob } = require('glob')
const globPromise = promisify(glob)

module.exports = async(client) => {
  console.log(`[ SHARDS ] › Shard ${client.shard.ids} conectada!`.green)

  client.music.start(client.user.id);
  await delay(10000)

  client.user.setActivity(`<help - ${await client.shard.fetchClientValues("guilds.cache.size").then((x) => x.reduce((f, y) => f + y))} Guilds | Shard [${client.shard.ids}]`)

// Slash Commands.

const slashCommands = await globPromise(`${process.cwd()}/src/commands/*/*.js`)

const arrayOfSlashCommands = [];

slashCommands.map((value) => {
const file = require(value)

if(!file?.name || !file.description ||!file.options) return;

arrayOfSlashCommands.push(file);
})

await client.application.commands.set(arrayOfSlashCommands);
//
};
