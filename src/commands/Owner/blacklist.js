module.exports = {
  name: 'blacklist',
  aliases: ['bl'],
  ownerOnly: true,
  async exec({ client, message, args }) {

    const user = client.utils.getUser(args[1]);
    const doc = client.db.user.findOne({ _id: user?.id });
    if(!user || !doc) return message.reply('usuario não encontrado.');

    if(['add', 'remove'].some(arg => args[0] == arg)) {
      if(args[0] == 'add') {
        doc.blacklist = true;
        await doc.save()
        message.reply('ok.');
      } else if(args[0] == 'remove') {
        doc.blacklist = false;
        await doc.save()
        message.reply('ok.');
      }
    } else {
      message.reply('bruh.');
    }
  }
};
