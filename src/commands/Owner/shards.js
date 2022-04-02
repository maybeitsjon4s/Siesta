module.exports = {
  name: 'shards',
  aliases: [],
  ownerOnly: true,
  async exec({ client, message }) {
    const map = client.ws.shards.map((shard) => `[ SHARD ${shard.id} ] Servers: ${client.guilds.cache.filter((y) => y.shardId === shard.id).size}, Ping: ${shard.ping}ms`);
    message.reply({
      content: '```' + map.join('\n') + '```'
    });
  }
};
