const { MessageEmbed } = require('discord.js-light');
const Emojis = require('../../Structures/Utils/emojis');

const Day = require('dayjs');

module.exports = {
  name: 'userinfo',
  aliases: ['ui', 'whois'],
  cooldown: 3,
  ownerOnly: false,
  description: '[ 📚 Utils ] Show yours/someones infos.',
  options: [{
    name: 'user',
    description: 'The user that you wanna see infos about.',
    type: 'STRING',
    required: false
  }],
  async exec({ client, message, args, player, lang }) {

        Day.locale(lang.name)

        let user = await client.utils.getUser(args[0], message);

        if (!user) user = message.author;

          const embed = new MessageEmbed()
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
                value: `\`${Day(user.createdAt).format('DD/MM/YYYY')}\` \`(${Day(user.createdAt).fromNow()})\``,
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
            value: `\`${Day(member.joinedAt).format(`DD/MM/YYYY`)}\` \`(${Day(member.joinedAt).fromNow()})\``,
            inline: true
          })
          
          if(member.premiumSince) embed.addFields({
              name: `${Emojis.boost} › ${lang.commands.userinfo.boosterSince}`,
              value: `\`${Day(member.premiumSince).format("DD/MM/YYYY")} \`\`(${Day(member.premiumSince).fromNow()})\``,
              inline: true
            })
        }

          message.reply({ embeds: [embed] });
  }
}
