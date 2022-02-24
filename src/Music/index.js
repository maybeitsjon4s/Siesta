import { Vulkava } from `vulkava`;
import nodes from './nodes.js';
import { readdirSync } from "fs";


export default async (client) => {
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

  readdirSync(`./src/events/lavalink/`).forEach((file) => {
    let event = await import(`../events/lavalink/${file}`);
    let eventName = file.split(`.`)[0];
    client.music.on(eventName, event.bind(null, client));
  });
}