export default {
  name: 'blacklist',
  aliases: ['bl'],
  ownerOnly: true,
  playerOnly: false,
  sameChannel: false,
  async exec({ client, message, args }) {

    const user = await client.utils.getUser(args[1], message);
    if(!user) return;
    const doc = await client.db.user.findById(user.id);
    if(!doc) return;

    if(['add', 'remove'].some(arg => args[0] == arg)) {
      if(args[0] == 'add') {
        doc.blacklist = true;
        await doc.save();
        message.reply(`**${client.Emojis.dev} › Usuario \`${user.tag}\` adicionado na blacklist**`);
      } else if(args[0] == 'remove') {
        doc.blacklist = false;
        await doc.save();
        message.reply(`**${client.Emojis.dev} › Usuario \`${user.tag}\` removido da blacklist.**`);
      }
    }
  }
};
