const { MessageEmbed } = require('discord.js-light');
const Day = require('dayjs');
const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
  name: 'serverinfo',
  aliases: ['si', 'svi', 'servericon'],
  cooldown: 4,
  ownerOnly: false,
  async run({ client, message, args, player, lang }) {

        Day.locale(lang.name)

        const guild = client.guilds.cache.get(args[0]) || message.guild;

        const embed = new MessageEmbed()
          .setTitle(`${Emojis.star} | __Siesta__`)
          .setColor(client.color)
          .addFields(
            {
              name: `${Emojis.user} › ${lang.commands.serverinfo.name}`,
              value: `\`${guild.name}\``,
              inline: true
            },
            {
              name: `${Emojis.info} › ID`, 
              value: `\`${guild.id}\``,
              inline: true
            },
            {
              name: `${Emojis.owner} › ${lang.commands.serverinfo.owner}`,
              value: `\`${await guild.fetchOwner().then((x) => x.user.tag)}\``,
              inline: true
            },
            {
              name: `${Emojis.heart2} › ${lang.commands.serverinfo.channels}`,
              value: `> **${lang.commands.serverinfo.text}** \`${guild.channels.cache.filter((a) => a.type === 'GUILD_TEXT'/*text*/).size}\`\n> **${lang.commands.serverinfo.voice}** \`${guild.channels.cache.filter((a) => a.type === 'GUILD_VOICE'/*voice*/).size}\`\n> **${lang.commands.serverinfo.category}** \`${guild.channels.cache.filter((a) => a.type === 'GUILD_CATEGORY'/*category*/).size}\``,
              inline: true
            },
            {
              name: `${Emojis.boost} › Boosts`,
              value: `\`${message.guild.premiumSubscriptionCount || '0'}\``,
              inline: true
            },
            {
              name: `${Emojis.rocket} › ${lang.commands.serverinfo.createdAt}`,
              value: `\`${Day(guild.createdAt).format("DD/MM/YYYY")}\` \`(${Day(guild.createdAt).fromNow()})\``,
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
}
