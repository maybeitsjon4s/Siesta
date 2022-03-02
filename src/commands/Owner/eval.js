const Emojis = require('../../Structures/Utils/emojis.js');

module.exports = {
  name: 'eval',
  aliases: ['e', 'ev'],
  cooldown: 0.1,
  ownerOnly: true,
  run: async (client, message, args, player, lang) => {
    
    if (!args[0]) return;

    const code = args.join(" ");
    if (!code) return;
    await message
      .reply(`**${Emojis.dev} » Executando o codigo...**`)
      .then(async (m) => {
        try {
          const pingStart = process.hrtime();
          let result = eval(code);

          if (typeof result !== "string") result = require("util").inspect(result);

          const pingStop = process.hrtime(pingStart);
          const time = Math.round((pingStop[0] * 1e9 + pingStop[1]) / 1e6);

          m.edit({
            content: `\`\`\`js\n${result.slice(0, 1970).replace((new RegExp(yml.token,"gi")), '******************')}\`\`\`\n\n\`\`\`${time}ms\`\`\``,
          })

        } catch (e) {
          m.edit({
            content: `\`\`\`js\n${e.stack.slice(0, 2000)}\`\`\``,
          });
        }
      });
  },
};
