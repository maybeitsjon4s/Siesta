const { MessageEmbed } = require('discord.js-light');
const Emojis = require('../../Structures/Utils/emojis');

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
  async exec({ client, message, args, lang }) {

    const user = await client.utils.getUser(args[0], message) || message.author;

    let badges;

    if(user.flags){
      badges = user.flags.toArray().join(' ')
        .replace('PARTNERED_SERVER_OWNER', '<:parceiro:938035311093612544>')
        .replace('DISCORD_CERTIFIED_MODERATOR', '<:mod:938035490836344852>')
        .replace('EARLY_VERIFIED_BOT_DEVELOPER', '<:dev2:938036145441374238>')
        .replace('EARLY_SUPPORTER', '<:supporter:938036320721326101>')
        .replace('HOUSE_BALANCE', '<:balance:938043574430347284>')
        .replace('HOUSE_BRILLIANCE', '<:briliance:938044002849128459>')
        .replace('HOUSE_BRAVERY', '<:bravery:938044368584056863>')
        .replace('VERIFIED_BOT', '')
        .replace('HYPESQUAD_EVENTS', '<:hypesquad:938548922954178610>');
    }

    const embed = new MessageEmbed()
      .setTitle(`${Emojis.star} | \`${user.tag}\` ${badges}`)
      .setColor(client.color)
      .addFields({
          name: `${Emojis.estrela} › ${lang.commands.userinfo.createdAccount}`,
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
      name: Emojis.heart2 + ` › ${lang.commands.userinfo.joinedAt}`,
      value: `<t:${(member.joinedAt / 1000).toFixed()}> (<t:${(member.joinedAt / 1000).toFixed()}:R>)`,
      inline: true
    });

    member && member.premiumSince && embed.fields.push({
      name: Emojis.boost + ` › ${lang.commands.userinfo.boosterSince}`,
      value: `<t:${(member.premiumSince / 1000).toFixed()}:F> (<t:${(member.premiumSince / 1000).toFixed()}:R>)`
    });
    message.reply({ embeds: [embed] });
  }
};
