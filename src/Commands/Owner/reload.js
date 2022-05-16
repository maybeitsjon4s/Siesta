import glob from 'glob';
import { reloadResources } from 'i18next';

export default {
  name: 'reload',
  aliases: ['rr'],
  ownerOnly: true,
  playerOnly: false,
  sameChannel: false,
  async exec({ client, message }) {

    // Commands
    
    //client.commands.sweep(() => true);
    //glob(`${global.process.cwd()}/src/Commands/**/*js`, async (err, filePaths) => {
    /*
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
    message.reply(`**${client.Emojis.dev} › Comandos recarregados.**`);
    */

    // Locales
    await reloadResources(['pt-BR', 'en-US']);
    message.reply(`**${client.Emojis.dev} › Locales recarregados.**`);
  },
};
