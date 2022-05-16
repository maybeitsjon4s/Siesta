import pkg from 'chalk';
const { blue } = pkg;

export default {
  name: 'ready',
  async exec(client) {
    client.logger.sucess('CLIENT', `Logged in as ${blue(client.user.username)}`);

    client.music.start(client.user.id);

    setInterval(() => { 
      client.user.setActivity(`<help - ${client.guilds.cache.size.toLocaleString()} Servers`);
    }, 60 * 60 * 1000);
  }
};
