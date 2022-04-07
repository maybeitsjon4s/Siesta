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
    .on('nodeConnect', async (node) => {
      client.logger.sucess(`[ ${node.options.id} ] Node Conectado`);
      setInterval(() => {
        node.send({
          op: 'pong'
        });
      }, 45000);
    })
    .on('nodeDisconnect', (node) => client.logger.error(`[ ${node.options.id} ] Node desconectado.`))
    .on('queueEnd', async (player) => {
      const lang = await getLanguage(player.guildId);
      if(player.autoplay?.status) {
        const mixURL = `https://www.youtube.com/watch?v=${player.autoplay.track.identifier}&list=RD${player.autoplay.track.identifier}`;
        const results = await client.music.search(mixURL);
        if(!results.tracks.length) return player.destroy();
        const tracks = results.tracks.map((track) => track.title !== player.autoplay.track ? track : '').filter((f) => f);
        const track = tracks[Math.floor(Math.random() * tracks.length)];
        track.setRequester({
          tag: 'AUTOPLAY#0000',
          id: client.user.id
        });
        player.queue.push(track);
        player.play().catch(() => {});
      } else {
        client.channels.cache.get(player.textChannelId).send(`**${Emojis.music} › ${lang.events.musicEvents.queueEnd}**`);
        player.destroy();
      }
    })

    .on('trackStart', async (player, track) => {
      if(player.autoplay?.status) player.autoplay.track = track;
      const channel = client.channels.cache.get(player.textChannelId);
  
      const lang = await getLanguage(player.guildId);
  
      channel.send(`**${Emojis.music} › ${lang.events.musicEvents.trackStart.replace('{track}', track.title).replace('{user}', track.requester.tag)}**`).then(msg => {
        setTimeout(() => {
          msg.delete(); 
        }, 3 * 60 * 1000);
      });
    })

    .on('trackStuck', async (player) => player.skip())

    .on('trackException', async({ player, exception }) => {
      player.skip();

      const lang = await getLanguage(player.guildId);


      client.channels.cache.get(player.textChannelId).send({ content: `**${Emojis.music} › ${lang.musicEvents.trackException} **` + '```\n' + exception.message + '```' });

    });
  const getLanguage = async (guildId) => {
    const guildDocument = await client.db.guild.findOne({ _id: guildId });
    let lang = guildDocument.lang || 0;
    if(lang == 1) {
      lang = client.langs.pt;
    } else {
      lang = client.langs.en;
    }
    return lang;
  };
};
