export default {
  name: 'unlock',
  aliases: ['destrancar'],
  ownerOnly: false,
  playerOnly: false,
  sameChannel: false,
  description: '[ 🔨 Moderation ] Unlocks the channel',
  options: [],
  async exec({ client, message, t }) {
    if (!message.member.permissions.has('MANAGE_CHANNELS') && !client.owners.some(id => id === message.author.id) ) return message.reply(`**${client.Emojis.errado} › ${t('commands:unlock.userPermission')}**`);

    if (!message.guild.me.permissions.has('MANAGE_CHANNELS')) return message.reply(`**${client.Emojis.errado} › ${t('commands:unlock.myPermission')}**`);

    message.channel.permissionOverwrites.edit(message.guild.id, {
      SEND_MESSAGES: true,
    });

    message.reply(`**${client.Emojis.ban} › ${t('commands:unlock.sucess')}!**`);
  }
};
