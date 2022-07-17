export default {
  name: 'unlock',
  aliases: ['destrancar'],
  ownerOnly: false,
  playerOnly: false,
  sameChannel: false,
  description: '[ 🔨 Moderation ] Unlocks the channel',
  options: [],
  async exec({ client, message, t }) {
    if (!message.member.permissions.has('ManageChannels') && !client.owners.some(id => id === message.author.id)) return message.reply(`**${client.emotes.errado} › ${t('commands:unlock.userPermission')}**`);

    if (!message.guild.members.me.permissions.has('ManageChannels')) return message.reply(`**${client.emotes.errado} › ${t('commands:unlock.myPermission')}**`);

    message.channel.permissionOverwrites.edit(message.guild.id, {
      SEND_MESSAGES: true,
    });

    message.reply(`**${client.emotes.ban} › ${t('commands:unlock.sucess')}!**`);
  }
};
