export default {
  name: 'lock',
  aliases: ['trancar'],
  ownerOnly: false,
  playerOnly: false,
  sameChannel: false,
  description: '[ 🔨 Moderation ] Locks the channel',
  options: [],
  async exec({ client, message, t }) {

    if (!message.member.permissions.has('ManageChannels') && !client.owners.some(id => id === message.author.id)) return message.reply(`**${client.emotes.errado} › ${t('commands:lock.userPermission')}**`);

    if (!message.guild.members.me.permissions.has('ManageChannels')) return message.reply(`**${client.emotes.errado} › ${t('commands:lock.myPermission')}**`);

    message.channel.permissionOverwrites.edit(message.guild.id, {
      SEND_MESSAGES: false,
    });

    message.reply(`**${client.emotes.ban} › ${t('commands:lock.sucess')}**`);
  }
};
