const { MessageEmbed } = require('discord.js');
const Emojis = require('../../Structures/Utils/emojis');
const moment = require('moment');

module.exports = {
  name: 'userinfo',
  aliases: ['ui', 'whois'],
  run: async (client, message, args, player, lang) => {
moment.locale(lang.name)

        let user = await client.utils.getUser(args[0], message);

        if (!user) user = message.author;

          const embed = new MessageEmbed()
            .setTitle(`${Emojis.star} | __Siesta__`)
            .setColor(client.color)
            .addField(`${Emojis.user} » User`, ` \`${user.tag}\``, true)
            .addField(`${Emojis.estrela} » ${lang.commands.userinfo.createdAccount}`, `\`${moment.utc(user.createdAt).format(`DD/MM/YYYY`)}\` \`(${moment(user.createdAt).fromNow()})\``, true)
            .addField(`<:members:867005290859462676> » Id`, `\`${user.id}\``, true)
            .setFooter({
              text: message.author.tag,
              iconURL: message.author.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp();

            if (message.guild.members.cache.get(user.id)) {
          let member = message.guild.members.cache.get(user.id);

          embed.addField(`${Emojis.heart2} » ${lang.commands.userinfo.joinedAt}`, `\`${moment.utc(member.joinedAt).format(`DD/MM/YYYY`)}\` \`(${moment(member.joinedAt).fromNow()})\``, true);
          
          if(member.premiumSince) embed.addField(`${Emojis.boost} » ${lang.commands.userinfo.boosterSince}`, `\`${moment.utc(member.premiumSince).format("DD/MM/YYYY")} \`\`(${moment.utc(member.premiumSince).fromNow()})\``, true)
        }

          message.reply({ embeds: [embed] });
  }
}
