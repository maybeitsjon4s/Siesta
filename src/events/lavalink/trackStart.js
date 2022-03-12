const Emojis = require('../../Structures/Utils/emojis');

module.exports = async (client, player, track) => {
  
  const channel = client.channels.cache.get(player.textChannelId);

  const GUILD = await client.db.guild.findOne({ _id: channel.guild.id })

  if (player.lastPlayingMsgID) {
    const msg = channel.messages.cache.get(player.lastPlayingMsgID);

    if (msg) msg.delete().catch(null);
  }
   let lang = GUILD.lang || 0

  switch(lang) {
    case 1:
    lang = client.langs.pt
    break;
    case 0:
    lang = client.langs.en
    break;
  }

  channel.send(`**${Emojis.music} › ${lang.events.musicEvents.trackStart.replace('{track}', track.title).replace('{user}', track.requester.tag)}**`).then(msg => {
    player.lastPlayingMsgID = msg.id;
  })

};
