import pkg from 'chalk';
const { blue } = pkg;

export default {
  name: 'ready',
  async exec(client) {
    client.logger.info(`${client.user.username} is ready!`, { tags: ['Client']});

    client.music.start(client.user.id);

    setInterval(() => { 
      client.user.setActivity(`<help - ${client.guilds.cache.size.toLocaleString()} Servers`);
    }, 60 * 60 * 1000);
  }
};
