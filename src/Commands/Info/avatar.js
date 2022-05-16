import { MessageEmbed } from 'discord.js';

export default {
  name: 'avatar',
  aliases: ['av'],
  ownerOnly: false,
  playerOnly: false,
  sameChannel: false,
  description: '[ 📚 Utils ] See yours/others avatars!',
  options: [{
    name: 'user',
    description: 'The user name/id/mention that you wanna see the avatar!',
    type: 'STRING',
    required: false
  }],
  async exec({ client, message, args, t }) {

    let user = await client.utils.getUser(args[0], message);
    if (!user) user = message.author;

    const avatar = user.displayAvatarURL({
      dynamic: true,
      size: 2048
    });
        
    const embed = new MessageEmbed()
      .setColor(client.color)
      .setTitle(`${client.Emojis.star} • __Siesta__`)
      .setDescription(`${t('commands:avatar.sucess', {
        user: user.username,
        URL: user.displayAvatarURL({ dynamic: true, size: 2048})
      })}**`)
      .setImage(avatar)
      .setFooter({
        text: message.author.tag,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    message.reply({ embeds: [embed] });
  },
};
