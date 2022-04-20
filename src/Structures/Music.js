const { Vulkava } = require('vulkava');
const Emojis = require('./Utils/emojis.js');
const i18next = require('i18next');
const { blue, green, red } = require('colors');

module.exports = class SiestaMusic extends Vulkava {
  constructor(client) {
    super({
      nodes: global.config.lavalinkNodes,
      unresolvedSearchSource: 'youtube',
      sendWS: (guildId, payload) => client.guilds.cache.get(guildId)?.shard.send(payload),
      spotify: {
        clientId: global.config.spotifyId,
        clientSecret: global.config.spotifyToken
      }
    });
    this.client = client;
    this.on('nodeConnect', (node) => {
      console.log(blue(`[ ${node.options.id} ]`), green('Node Conectado.'))
      setInterval(() => {
        node.send({
          op: 'pong'
        });
      }, 45000);
    });
    this.on('error', (node, error) => {
      if(error.message.includes('503') || error.message.includes('1006')) return;
      console.log(blue(`[ ${node.identifier} ]`), green(`Erro, ${error.message}`));
    });
    this.on('nodeDisconnect', (node) => console.log(red(`[ ${node.options.id} ]`), green('Node Desconectado')));

    this.on('queueEnd', async (player) => {
      const t = await this.getLanguage(player.guildId);
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
        client.channels.cache.get(player.textChannelId).send(`**${Emojis.music} › ${t('events:musicEvents.queueEnd')}**`);
        player.destroy();
      }
    });
    this.on('trackStart', async (player, track) => {
      if(player.autoplay?.status) player.autoplay.track = track;
      const channel = this.client.channels.cache.get(player.textChannelId);
    
      const t = await this.getLanguage(player.guildId);
    
      channel.send(`**${Emojis.music} › ${t('events:musicEvents.trackStart', {
        track: track.title,
        user: track.requester.tag
      })}**`).then(msg => {
        setTimeout(() => {
          msg.delete(); 
        }, 3 * 60 * 1000);
      });
    });
    this.on('trackStuck', (player) => player.skip());
    this.on('trackException', async({ player, exception }) => {
      player.skip();
      const t = await this.getLanguage(player.guildId);
      client.channels.cache.get(player.textChannelId).send({ content: `**${Emojis.music} › ${t('events:musicEvents.trackException')} **` + '```\n' + exception.message + '```' });
    });
  }

  async getLanguage(guildId) {
    const guildDocument = await this.client.db.guild.findOne({ _id: guildId });
    let lang = guildDocument.lang || 0;
    let t;
    if(lang == 1) {
      t = i18next.getFixedT('pt-BR');
    } else {
      t = i18next.getFixedT('en-US');
    }
    return t;
  }
};

