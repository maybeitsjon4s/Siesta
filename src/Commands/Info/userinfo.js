import { EmbedBuilder, ApplicationCommandOptionType } from 'discord.js';

export default {
  name: 'userinfo',
  aliases: ['ui', 'whois'],
  ownerOnly: false,
  playerOnly: false,
  sameChannel: false,
  description: '[ 📚 Utils ] Show yours/someones infos.',
  options: [{
    name: 'user',
    description: 'The user that you wanna see infos about.',
    type: ApplicationCommandOptionType.String,
    required: false
  }],
  async exec({ client, message, args, t }) {

    const user = await client.utils.getUser(args[0], message) || message.author;

    const embed = new EmbedBuilder()
      .setDescription(`** [${user.username}](https://discord.com/users/${user.id}/) • ${client.utils.getUserFlags(user) || client.emotes.user}**`)
      .setColor(client.color)
      .addFields({
        name: `${client.emotes.estrela} › ${t('commands:userinfo.createdAccount')}`,
        value: `<t:${(user.createdAt / 1000).toFixed()}> (<t:${(user.createdAt / 1000).toFixed()}:R>)`,
        inline: true
      })
      .setFooter({
        text: message.author.tag,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    const member = await message.guild.members.fetch(user.id).catch(() => { });


    member && embed.fields.push({
      name: client.emotes.heart2 + ` › ${t('commands:userinfo.joinedAt')}`,
      value: `<t:${(member.joinedAt / 1000).toFixed()}> (<t:${(member.joinedAt / 1000).toFixed()}:R>)`,
      inline: true
    });

    user.displayAvatarURL() && embed.setThumbnail(user.displayAvatarURL());

    member && member.premiumSince && embed.fields.push({
      name: client.emotes.boost + ` › ${t('commands:userinfo.boosterSince')}`,
      value: `<t:${(member.premiumSince / 1000).toFixed()}> (<t:${(member.premiumSince / 1000).toFixed()}:R>)`
    });
    message.reply({ embeds: [embed] });
  }
};
