import { ButtonBuilder, ActionRowBuilder, ButtonStyle } from 'discord.js';

export default {
  name: 'stats',
  aliases: ['estatisticas', 'botinfo', 'bi'],
  ownerOnly: false,
  playerOnly: false,
  sameChannel: false,
  description: '[ 📚 Utils ] Show some infos about me.',
  options: [],
  async exec({ client, message, t }) {

    message.reply({
      embeds: [{
        author: {
          name: 'Status • Siesta',
          iconURL: client.user.displayAvatarURL(),
          url: 'https://top.gg/bot/907747074118926347'
        },
        color: client.color,
        description: `> ${message.author}, ${t('commands:stats.message')}`,
        fields: [{
          name: `${client.emotes.star} ${t('commands:stats.stats')}`,
          value: `> ${client.emotes.rocket} Servers: **${client.guilds.cache.size}**\n> ${client.emotes.heart2}Uptime: **${client.utils.formatTime(client.uptime)}**\n> ${client.emotes.config} RAM: **${client.utils.formatSizeUnits(global.process.memoryUsage().heapUsed)}**\n> ${client.emotes.aurora} Players: **${client.music.players.size}**`,
          inline: true
        }],
        footer: {
          text: `${t('commands:stats.createdBy')} ${await client.users.fetch('431768491759239211').then((f) => f.tag)}`,
          iconURL: await client.users.fetch('431768491759239211').then((f) => f.displayAvatarURL({ dynamic: true }))
        }
      }],
      components: [new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setURL('https://discord.com/api/oauth2/authorize?client_id=907747074118926347&permissions=271641686&scope=applications.commands%20bot')
          .setLabel(t('commands:stats.label')[0]),
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setURL('https://discord.com/invite/vYEutrG7gY')
          .setLabel(t('commands:stats.label')[1])
      )]
    });
  }
};
