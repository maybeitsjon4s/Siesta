const glob = require('glob');

module.exports = {
  name: 'reload',
  aliases: ['rr'],
  run: async (client, message, args, player, lang) => {
    if (!client.owners.some(x => x === message.author.id)) return;

    client.commands.sweep(() => true);

    glob(`${__dirname}/../**/*js`, async (err, filePaths) => {
      if (err) return console.log(err);

      filePaths.forEach((file) => {

        delete require.cache[require.resolve(file)];

        const pull = require(file);
        if (pull.name) {
          client.commands.set(pull.name, pull);
        }
        if (pull.aliases && Array.isArray(pull.aliases)) {
          pull.aliases.forEach((alias) => {
            client.aliases.set(alias, pull.name);
          });
        }
      });
    });
    message.reply(`**${Emojis.dev} » Comandos recarregados.**`);
  },
};
