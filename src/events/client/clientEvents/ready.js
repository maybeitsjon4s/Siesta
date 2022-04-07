const Music = require('../../../Structures/Music.js');

module.exports = async(client) => {
  client.music = new Music(client)
  client.loadSlashCommands()
  client.logger.sucess(`[ CLIENT ] Fui iniciada como ${client.user.username} com ${client.guilds.cache.size.toLocaleString()} servers.`);
  client.music.start(client.user.id);
  setInterval(() => client.user.setActivity(`<help - ${client.guilds.cache.size.toLocaleString()} Servers`), 60 * 60 * 60 * 1000);
};
