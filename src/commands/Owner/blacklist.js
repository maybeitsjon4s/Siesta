module.exports = {
  name: 'blacklist',
  aliases: ['bl'],
  ownerOnly: true,
  async exec({ client, message, args }) {

    const user = await client.utils.getUser(args[1]);
    if(!user) return;
    const doc = await client.db.user.findOne(user.id);
    if(!doc) return;

    if(['add', 'remove'].some(arg => args[0] == arg)) {
      if(args[0] == 'add') {
        doc.blacklist = true;
        await doc.save();
        message.reply('ok.');
      } else if(args[0] == 'remove') {
        doc.blacklist = false;
        await doc.save();
        message.reply('ok.');
      }
    }
  }
};
