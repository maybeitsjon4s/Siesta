const delay = require('util').promisify(setTimeout);

module.exports = async(client) => {
  console.log(`[ SHARDS ] › Shard ${client.shard.ids} conectada!`.green)
  await delay(5000)
  client.music.start(client.user.id);
  client.user.setActivity(`<help - ${await client.shard.fetchClientValues("guilds.cache.size").then((x) => x.reduce((f, y) => f + y))} Guilds | Shard [${client.shard.ids}]`, {
    type: 'LISTENING',
  })
};
