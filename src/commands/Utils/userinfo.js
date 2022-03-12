const { Embed } = require('discord.js');
const Emojis = require('../../Structures/Utils/emojis');
const moment = require('moment');

module.exports = {
  name: 'userinfo',
  aliases: ['ui', 'whois'],
  cooldown: 3,
  ownerOnly: false,
  run: async (client, message, args, player, lang) => {

        moment.locale(lang.name)

        let user = await client.utils.getUser(args[0], message);

        if (!user) user = message.author;

          const embed = new Embed()
            .setTitle(`${Emojis.star} | __Siesta__`)
            .setColor(client.color)
            .addFields(
              {
                name: `${Emojis.user} › User`,
                value: `\`${user.tag}\``,
                inline: true
              },
              {
                name: `${Emojis.estrela} › ${lang.commands.userinfo.createdAccount}`,
                value: `\`${moment.utc(user.createdAt).format(`DD/MM/YYYY`)}\` \`(${moment(user.createdAt).fromNow()})\``,
                inline: true
              },
              {
                name: '<:members:867005290859462676> › Id',
                value: `\`${user.id}\``,
                inline: true
              }
            )
            .setFooter({
              text: message.author.tag,
              iconURL: message.author.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp();
    let member;
    try{
      member = await message.guild.members.fetch(user.id)
    }
    catch {}

            if (member) {

          embed.addFields({
            name: `${Emojis.heart2} › ${lang.commands.userinfo.joinedAt}`,
            value: `\`${moment.utc(member.joinedAt).format(`DD/MM/YYYY`)}\` \`(${moment(member.joinedAt).fromNow()})\``,
            inline: true
          })
          
          if(member.premiumSince) embed.addFields({
              name: `${Emojis.boost} › ${lang.commands.userinfo.boosterSince}`,
              value: `\`${moment.utc(member.premiumSince).format("DD/MM/YYYY")} \`\`(${moment.utc(member.premiumSince).fromNow()})\``,
              inline: true
            })
        }

          message.reply({ embeds: [embed] });
  }
}
