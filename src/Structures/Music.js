import { Vulkava } from 'vulkava';
import i18next from 'i18next';
import { promisify } from 'util';
const delay = promisify(setTimeout);
import pkg from 'chalk';
const { red, green } = pkg;

export default class SiestaMusic extends Vulkava {
  constructor(client) {
    super({
      nodes: global.config.lavalinkNodes,
      unresolvedSearchSource: 'youtube',
      sendWS: (guildId, payload) => client.guilds.cache.get(guildId)?.shard.send(payload),
      spotify: {
        clientId: global.config.spotify.id,
        clientSecret: global.config.spotify.secret
      }
    });
    this.client = client;

    this.on('nodeConnect', (node) => {
      this.client.logger.info(`Node ${node.options.id} Connected`, { tags: ['Nodes', 'Vulkava']});
      setInterval(() => {
        node.send({
          op: 'pong'
        });
      }, 45000);

    });
    this.on('error', (node, error) => {
      if (error.message.includes('503') || error.message.includes('1006')) return;
      this.client.logger.warn(error, { tags: ['Vulkava']});
    });

    this.on('nodeDisconnect', (node) => this.client.logger.warn(`Node ${node.options.id} Disconnected`, { tags: ['Nodes', 'Vulkava']}));

    this.on('queueEnd', async (player) => {
      const t = await this.getLanguage(player.guildId);
      if (player.autoplay?.status) {
        const mixURL = `https://www.youtube.com/watch?v=${player.autoplay.track.identifier}&list=RD${player.autoplay.track.identifier}`;
        const results = await client.music.search(mixURL);
        if (!results.tracks.length) return player.destroy();
        const tracks = results.tracks.map((track) => track.title !== player.autoplay.track ? track : '').filter((f) => f);
        const track = tracks[Math.floor(Math.random() * tracks.length)];
        track.setRequester({
          tag: 'AUTOPLAY#0000',
          id: client.user.id
        });
        player.queue.push(track);
        player.play().catch(() => { });
      } else {
        const guild = player.guildId;
        await delay(3 * 60 * 1000); // 3 mins
        if (client.music.players.get(guild) && !client.music.players.get(guild).playing) {
          client.channels.cache.get(player.textChannelId).send(`**${this.client.emotes.music} › ${t('events:musicEvents.queueEnd')}**`).catch(() => { });
          player.destroy();
        }
      }
    });

    this.on('trackStart', async (player, track) => {
      if (player.autoplay?.status) player.autoplay.track = track;
      const channel = this.client.channels.cache.get(player.textChannelId);

      const t = await this.getLanguage(player.guildId);

      channel.send(`**${this.client.emotes.music} › ${t('events:musicEvents.trackStart', {
        track: track.title,
        user: track.requester.tag
      })}**`).then(msg => {
        setTimeout(() => {
          msg.delete().catch(() => { });
        }, 3 * 60 * 1000);
      });
    });

    this.on('trackStuck', (player) => player.skip());
    this.on('trackException', async ({ player, exception }) => {
      player.skip();
      const t = await this.getLanguage(player.guildId);
      client.channels.cache.get(player.textChannelId).send({ content: `**${this.client.emotes.music} › ${t('events:musicEvents.trackException')} **` + '```\n' + exception.message + '```' });
    });

  }

  async getLanguage(guildId) {
    const guildDocument = await this.client.db.guild.findOne({ _id: guildId });
    let lang = guildDocument.lang || 0;
    let t;
    if (lang == 1) {
      t = i18next.getFixedT('pt-BR');
    } else {
      t = i18next.getFixedT('en-US');
    }
    return t;
  }
}

