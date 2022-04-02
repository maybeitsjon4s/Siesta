const { promisify } = require('util');
const delay = promisify(setTimeout);
const { glob } = require('glob');
const globPromise = promisify(glob);

module.exports = async(client) => {
  client.logger.sucess(`[ CLIENT ] Fui iniciado em ${client.guilds.cache.size} servidores com sucesso`);

  client.music.start(client.user.id);
  await delay(10000);

  client.user.setActivity(`<help - ${client.guilds.cache.size} Guilds | Shard [${client.ws.shards.id}]`);

  // Slash Commands.

  const slashCommands = await globPromise(`${global.process.cwd()}/src/commands/*/*.js`);

  const arrayOfSlashCommands = [];

  slashCommands.map((value) => {
    const file = require(value);

    if(!file?.name || !file.description ||!file.options) return;

    arrayOfSlashCommands.push(file);
  });

  await client.application.commands.set(arrayOfSlashCommands);
//
};
