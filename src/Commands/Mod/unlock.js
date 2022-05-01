const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
  name: 'unlock',
  aliases: ['destrancar'],
  ownerOnly: false,
  playerOnly: false,
  sameChannel: false,
  description: '[ 🔨 Moderation ] Unlocks the channel',
  options: [],
  async exec({ client, message, t }) {
    if (!message.member.permissions.has('MANAGE_CHANNELS') && !client.owners.some(id => id === message.author.id) ) return message.reply(`**${Emojis.errado} › ${t('commands:unlock.userPermission')}**`);

    if (!message.guild.me.permissions.has('MANAGE_CHANNELS')) return message.reply(`**${Emojis.errado} › ${t('commands:unlock.myPermission')}**`);

    message.channel.permissionOverwrites.edit(message.guild.id, {
      SEND_MESSAGES: true,
    });

    message.reply(`**${Emojis.ban} › ${t('commands:unlock.sucess')}!**`);
  }
};
