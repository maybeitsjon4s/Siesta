const delay = require('util').promisify(setTimeout);

module.exports = async(client) => {
  console.log(`[ SHARDS ] › Shard ${client.shard.ids} conectada!`.green)
  client.music.start(client.user.id);
  await delay(10000)
  client.user.setActivity(`<help - ${await client.shard.fetchClientValues("guilds.cache.size").then((x) => x.reduce((f, y) => f + y))} Guilds | Shard [${client.shard.ids}]`)
};
