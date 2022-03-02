const { Embed } = require('discord.js');
const moment = require('moment');
const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
  name: 'serverinfo',
  aliases: ['si', 'svi', 'servericon'],
  cooldown: 4,
  ownerOnly: false,
  run: async (client, message, args, player, lang) => {
    moment.locale(lang.name)
        const guild = client.guilds.cache.get(args[0]) || message.guild;

        const embed = new Embed()
          .setTitle(`${Emojis.star} | __Siesta__`)
          .setColor(client.color)
          .addFields(
            {
              name: `${Emojis.user} » ${lang.commands.serverinfo.name}`,
              value: `\`${guild.name}\``,
              inline: true
            },
            {
              name: `${Emojis.info} » ID`, 
              value: `\`${guild.id}\``,
              inline: true
            },
            {
              name: `${Emojis.owner} » ${lang.commands.serverinfo.owner}`,
              value: `\`${await guild.fetchOwner().then((x) => x.user.tag)}\``,
              inline: true
            },
            {
              name: `${Emojis.heart2} » ${lang.commands.serverinfo.channels}`,
              value: `> **${lang.commands.serverinfo.text}** \`${guild.channels.cache.filter((a) => a.type === 0/*text*/).size}\`\n> **${lang.commands.serverinfo.voice}** \`${guild.channels.cache.filter((a) => a.type === 2/*voice*/).size}\`\n> **${lang.commands.serverinfo.category}** \`${guild.channels.cache.filter((a) => a.type === 4/*category*/).size}\``,
              inline: true
            },
            {
              name: `${Emojis.boost} » Boosts`,
              value: `\`${message.guild.premiumSubscriptionCount || `0`}\``,
              inline: true
            },
            {
              name: `${Emojis.rocket} » ${lang.commands.serverinfo.createdAt}`,
              value: `\`${moment.utc(guild.createdAt).format("DD/MM/YYYY")}\` \`(${moment.utc(guild.createdAt).fromNow()})\``,
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
