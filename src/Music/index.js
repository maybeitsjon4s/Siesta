const { Vulkava } = require(`vulkava`);
const nodes = require('./nodes')
const fs = require("fs")
module.exports = async (client) => {
  client.music = new Vulkava({
    nodes: nodes,
    sendWS: (guildId, payload) => {
      client.guilds.cache.get(guildId)?.shard.send(payload);
    },
    spotify: {
      clientId: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
    },
  });

  fs.readdirSync(`./src/events/lavalink/`).forEach((file) => {
    let event = require(`../events/lavalink/${file}`);
    let eventName = file.split(`.`)[0];
    client.music.on(eventName, event.bind(null, client));
  });
}