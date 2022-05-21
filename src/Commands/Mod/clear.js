export default {
  name: 'clear',
  aliases: ['limpar', 'clean'],
  ownerOnly: false,
  playerOnly: false,
  sameChannel: false,
  description: '[ 🔨 Moderation ] Deletes an amount of messages in the channel',
  options: [{
    name: 'messages',
    description: 'The amount of messages you wanna delete',
    type: 'NUMBER',
    required: true
  }],
  async exec({ client, message, args, t }) {

    if (!message.member.permissions.has('MANAGE_MESSAGES') && !client.owners.some(id => id === message.author.id)) return message.reply(`**${client.emj.errado} › ${t('commands:clear.userPermission')}**`);

    if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) return message.reply(`**${client.emj.errado} › ${t('commands:clear.myPermission')}**`);

    const deleteCount = parseInt(args[0], 10);

    if (!deleteCount || deleteCount < 1 || deleteCount > 99) return message.reply(`**${client.emj.errado} › ${t('commands:clear.invalidCount')}**`);

    const fetched = await message.channel.messages.fetch({
      limit: deleteCount + 1,
    });

    await message.channel.bulkDelete(fetched, true);

    message.channel.send({
      content: `**${client.emj.ban} › ${t('commands:clear.finalMessage', {
        count: deleteCount.toString()
      })}!**`,
      ephemeral: true
    }).then((msg) => {
      setTimeout(() => {
        msg.delete().catch(() => {});
      }, 5000);
    });
  },
};
