const { Vulkava } = require(`vulkava`);
const nodes = require('./nodes')
const { readdirSync } = require("fs")

module.exports = async (client) => {

  client.music = new Vulkava({
    nodes: nodes,
    sendWS: (guildId, payload) => {
      client.guilds.cache.get(guildId)?.shard.send(payload);
    },
    spotify: {
      clientId: yml.spotify_id,
      clientSecret: yml.spotify_token,
    },
  });

  readdirSync('./src/events/lavalink/').forEach((file) => {
    const event = require(`../events/lavalink/${file}`);
    const eventName = file.split('.')[0];
    client.music.on(eventName, event.bind(null, client));
  });
}
