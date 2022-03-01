const glob = require('glob');
const Emojis = require('../../Structures/Utils/emojis.js');

module.exports = {
  name: 'reload',
  aliases: ['rr'],
  cooldown: 3,
  ownerOnly: true,
  run: async (client, message, args, player, lang) => {

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
