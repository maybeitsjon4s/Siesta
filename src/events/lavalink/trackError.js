const Emojis = require(`../../Structures/Utils/emojis`);
const Guild = require("../../database/Schemas/Guild")
module.exports = async (client, player, track) => {
  let channel = client.channels.cache.get(player.textChannelId);
  const GUILD = await Guild.findOne({ _id: channel.guild.id })
  
   let lang = GUILD.lang || 0

  switch(lang) {
    case 1:
    lang = client.langs.pt
    break;
    case 0:
    lang = client.langs.en
    break;
  }

  channel.send(`**${Emojis.music} » ${lang.events.musicEvents.trackStuck}**`)
  player.skip();
};
