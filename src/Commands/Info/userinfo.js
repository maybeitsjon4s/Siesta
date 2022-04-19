const { MessageEmbed } = require('discord.js-light');
const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
  name: 'userinfo',
  aliases: ['ui', 'whois'],
  ownerOnly: false,
  playerOnly: false,
  sameChannel: false,
  description: '[ 📚 Utils ] Show yours/someones infos.',
  options: [{
    name: 'user',
    description: 'The user that you wanna see infos about.',
    type: 'STRING',
    required: false
  }],
  async exec({ client, message, args, t }) {

    const user = await client.utils.getUser(args[0], message) || message.author;

    const embed = new MessageEmbed()
      .setTitle(`__${user.tag.replaceAll('_', '')}__ ${client.utils.getUserFlags(user)}`)
      .setColor(client.color)
      .addFields({
        name: `${Emojis.estrela} › ${t('commands:userinfo.createdAccount')}`,
        value: `<t:${(user.createdAt / 1000).toFixed()}> (<t:${(user.createdAt / 1000).toFixed()}:R>)`,
        inline: true
      })
      .setFooter({
        text: message.author.tag,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();
		
    const member = await message.guild.members.fetch(user.id).catch(() => {});


    member && embed.fields.push({
      name: Emojis.heart2 + ` › ${t('commands:userinfo.joinedAt')}`,
      value: `<t:${(member.joinedAt / 1000).toFixed()}> (<t:${(member.joinedAt / 1000).toFixed()}:R>)`,
      inline: true
    });

    member && member.premiumSince && embed.fields.push({
      name: Emojis.boost + ` › ${t('commands:userinfo.boosterSince')}`,
      value: `<t:${(member.premiumSince / 1000).toFixed()}> (<t:${(member.premiumSince / 1000).toFixed()}:R>)`
    });
    message.reply({ embeds: [embed] });
  }
};
