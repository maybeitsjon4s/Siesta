export default {
  name: 'unmute',
  aliases: 'rm',
  ownerOnly: false,
  playerOnly: false,
  sameChannel: false,
  description: '[ 🔨 Moderation ] Removes a member timeout.',
  options: [{
    name: 'user',
    description: 'The user you wanna remove the timeout',
    type: 'STRING',
    required: true
  }, {
    name: 'reason',
    description: 'The reason for removing the timeout',
    type: 'STRING',
    required: false
  }],
  async exec({ client, args, message, t }) {

    if(!message.member.permissions.has('MODERATE_MEMBERS')) return message.reply(`**${client.emj.errado} › ${t('commands:unmute.userPermission')}!**`);

    if(!message.guild.me.permissions.has('MODERATE_MEMBERS')) return message.reply(`**${client.emj.errado} › ${t('commands:unmute.myPermission')}!**`);

    const member = await message.guild.members.fetch(await client.utils.getUser(args[0]).catch(() => {})).catch(() => {});

    if(!member || member.id === message.author.id) return message.reply(`**${client.emj.errado} › ${t('commands:unmute.noUser')}!**`);

    if(!member.communicationDisabledUntilTimestamp) return message.reply(`**${client.emj.errado} › ${t('commands:unmute.userNotMuted')}!**`);

    const reason = args[1] || 'Removing timeout';

    await member.timeout(0, `By: ${message.author.tag} - ${reason}`).catch(() => {});

    message.reply(`**${client.emj.ban} › ${t('commands:unmute.sucess', {
      user: member.user.tag
    })}!**`);
  }
};
