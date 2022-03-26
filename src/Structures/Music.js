const { Vulkava } = require('vulkava');
const Emojis = require('./Utils/emojis.js');

module.exports = async (client) => {

  client.music = new Vulkava({
    nodes: global.config.lavalinkNodes,
    unresolvedSearchSource: 'youtube',
    sendWS: (guildId, payload) => {
      client.guilds.cache.get(guildId)?.shard.send(payload);
    },
    spotify: {
      clientId: global.config.spotifyId,
      clientSecret: global.config.spotifyToken,
    },
  })
  .on("nodeConnect", async (node) => {
    console.log(`[ ${node.options.id} ] Node Conectado! (${client.shard.ids})`.magenta)
        setInterval(() => {
          node.send({
            op: 'pong'
          })
        }, 45000);
  })
  .on("error", (node, error) => console.log(`[ ${node.identifier} ] Erro (${client.shard.ids})`.red + '\n' + String(error.message).gray))

  .on("nodeDisconnect", (node, code, reason) => console.log(`[ ${node.options.id } ] Node desconectado (${client.shard.ids})`.red + '\n' + String(reason).gray))

  .on("queueEnd", async (player) => {
    const doc = await client.db.guild.findOne({ _id: player.guildId })
  
    let lang = doc.lang || 0
  
    switch(lang) {
      case 1:
      lang = client.langs.pt
      break;
      case 0:
      lang = client.langs.en
      break;
    }
    client.channels.cache.get(player.textChannelId).send(`**${Emojis.music} › ${lang.events.musicEvents.queueEnd}**`)
    player.destroy();
  })

  .on("trackStart", async (player, track) => {
  
    const channel = client.channels.cache.get(player.textChannelId);
  
    const doc = await client.db.guild.findOne({ _id: channel.guild.id })
  
    if (player.lastPlayingMsgID) channel.messages.forge(player.lastPlayingMsgID).delete()

     let lang = doc.lang || 0
  
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
  })

  .on("trackStuck", async (player, track) => player.skip())

  .on("trackException", async(player, track, exception) => {
    player.skip()

    const doc = await client.db.guild.findOne({ _id: message.author.id })

    let lang = doc.lang || 0;

    switch(lang) {
      case 1:
        lang = client.langs.pt;
        break;
      case 0:
        lang = client.langs.en;
        break;
    }

    client.channels.cache.get(player.textChannelId).send({ content: `**${Emojis.music} › ${lang.musicEvents.trackException} **` + '```\n' + exception.message + '```'})

  })
};