module.exports = {
  name: 'messageUpdate',
  async exec(client, oldMessage, message) {
    if(!message.guild || !message.author ||message.author?.bot) return;

    if (message.content?.trim() == oldMessage.content?.trim()) return;
    client.emit('messageCreate', message);
  }
};
