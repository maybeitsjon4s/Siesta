const glob = require('glob');
const Emojis = require('../../Structures/Utils/emojis.js');
const i18next = require('i18next')
module.exports = {
  name: 'reload',
  aliases: ['rr'],
  ownerOnly: true,
  playerOnly: false,
  sameChannel: false,
  async exec({ client, message }) {

    client.commands.sweep(() => true);

    glob(`${global.process.cwd()}/src/Commands/**/*js`, async (err, filePaths) => {
      if (err) return message.reply('```' + err.stack + '```');

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
    message.reply(`**${Emojis.dev} › Comandos recarregados.**`);
    
    client.localeManager.reload()
    message.reply(`**${Emojis.dev} › Locales recarregados.**`);
  },
};
