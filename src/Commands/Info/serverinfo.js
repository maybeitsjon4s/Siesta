import { MessageEmbed } from 'discord.js';

export default {
  name: 'serverinfo',
  aliases: ['si', 'svi', 'servericon'],
  ownerOnly: false,
  playerOnly: false,
  sameChannel: false,
  description: '[ 📚 Utils ] Show some infos about this guild.',
  options: [],
  async exec({ client, message, args, t }) {

    const guild = client.guilds.cache.get(args[0]) || message.guild;

    const embed = new MessageEmbed()
      .setTitle(`${client.Emojis.star}・__Siesta__`)
      .setColor(client.color)
      .addFields(
        {
          name: `${client.Emojis.user} › ${t('commands:serverinfo.name')}`,
          value: `\`${guild.name}\``,
          inline: true
        },
        {
          name: `${client.Emojis.info} › ID`, 
          value: `\`${guild.id}\``,
          inline: true
        },
        {
          name: `${client.Emojis.owner} › ${t('commands:serverinfo.owner')}`,
          value: `\`${await guild.fetchOwner().then((x) => x.user.tag)}\``,
          inline: true
        },
        {
          name: `${client.Emojis.heart2} › ${t('commands:serverinfo.channels')}`,
          value: `> **${t('commands:serverinfo.text')}** \`${guild.channels.cache.filter((a) => a.type === 'GUILD_TEXT'/*text*/).size}\`\n> **${t('commands:serverinfo.voice')}** \`${guild.channels.cache.filter((a) => a.type === 'GUILD_VOICE'/*voice*/).size}\`\n> **${t('commands:serverinfo.category')}** \`${guild.channels.cache.filter((a) => a.type === 'GUILD_CATEGORY'/*category*/).size}\``,
          inline: true
        },
        {
          name: `${client.Emojis.boost} › Boosts`,
          value: `\`${message.guild.premiumSubscriptionCount || '0'}\``,
          inline: true
        },
        {
          name: `${client.Emojis.rocket} › ${t('commands:serverinfo.createdAt')}`,
          value: `<t:${(guild.createdAt / 1000).toFixed()}> (<t:${(guild.createdAt / 1000).toFixed()}:R>)`,
          inline: true
        }
      )
      .setThumbnail(guild.iconURL() || client.user.displayAvatarURL())
      .setFooter({
        text: `${message.author.tag}`,
        iconURL: message.author.displayAvatarURL({ dynamic: true })
      })
      .setTimestamp();

    message.reply({ embeds: [embed] });
  }
};
