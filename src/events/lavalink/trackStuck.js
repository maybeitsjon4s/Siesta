import { music } from `../../Structures/Utils/emojis.js`;
import { findOne } from "../../database/Schemas/Guild.js";

export default async (client, player, track, playload) => {
  let channel = client.channels.cache.get(player.textChannelId);
  const GUILD = await findOne({ _id: channel.guild.id })
  
   let lang = GUILD.lang || 0

  switch(lang) {
    case 1:
    lang = client.langs.pt
    break;
    case 0:
    lang = client.langs.en
    break;
  }

  channel.send(`**${music} » ${lang.events.musicEvents.trackStuck}**`)
  player.skip();
};
