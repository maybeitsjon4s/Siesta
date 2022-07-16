export default {
  name: 'messageUpdate',
  async exec(client, oldMessage, message) {
    if(!message.guild || !message.author ||message.author?.bot) return;

    if (message?.content.trim() !== oldMessage?.content.trim()) client.emit('messageCreate', message);
  }
};
