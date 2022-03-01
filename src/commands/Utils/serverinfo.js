const { MessageEmbed } = require('discord.js');
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

        let embed = new MessageEmbed()
          .setTitle(`${Emojis.star} | __Siesta__`)
          .setColor(client.color)
          .addField(`${Emojis.user} » ${lang.commands.serverinfo.name}`, `\`${guild.name}\``, true)
          .addField(`${Emojis.info} » ID`, `\`${guild.id}\``, true)
          .addField(`${Emojis.owner} » ${lang.commands.serverinfo.owner}`, `\`${await guild.fetchOwner().then((x) => x.user.tag)}\``, true)
          .setThumbnail(guild.iconURL() || client.user.displayAvatarURL())
          .addField(`${Emojis.heart2} » ${lang.commands.serverinfo.channels}`,`> **${lang.commands.serverinfo.text}** \`${guild.channels.cache.filter((a) => a.type === "GUILD_TEXT").size}\`\n> **${lang.commands.serverinfo.voice}** \`${guild.channels.cache.filter((a) => a.type === "GUILD_VOICE").size}\`\n> **${lang.commands.serverinfo.category}** \`${guild.channels.cache.filter((a) => a.type === "GUILD_CATEGORY").size}\``)
          .addField(`${Emojis.boost} » Boosts`,`\`${message.guild.premiumSubscriptionCount || `0`}\``, true)
          .addField(
            `${Emojis.rocket} » ${lang.commands.serverinfo.createdAt}`, `\`${moment.utc(guild.createdAt).format("DD/MM/YYYY")}\` \`(${moment.utc(guild.createdAt).fromNow()})\``, true)
          .setFooter({
            text: `${message.author.tag}`,
            iconURL: message.author.displayAvatarURL({ dynamic: true })
          })
          .setTimestamp();
        message.reply({ embeds: [embed] });
      }
}
