const { promisify } = require('util');
const { glob } = require('glob');
const globPromise = promisify(glob);

module.exports = async(client) => {
  client.logger.sucess(`[ CLIENT ] Fui iniciada como ${client.user.username} com ${client.guilds.cache.size.toLocaleString()} servers.`);

  client.music.start(client.user.id);

  client.user.setActivity(`<help - ${client.guilds.cache.size.toLocaleString()} Guilds`);

  // Slash Commands.

  const slashCommands = await globPromise(`${global.process.cwd()}/src/commands/*/*.js`);

  const arrayOfSlashCommands = [];

  slashCommands.map((value) => {
    const file = require(value);

    if(!file?.name || !file.description ||!file.options) return;

    arrayOfSlashCommands.push(file);
  });

  //await client.application.commands.set(arrayOfSlashCommands);
//
};
