const Emojis = require('../../Structures/Utils/emojis.js');

module.exports = {
  name: 'eval',
  aliases: ['e', 'ev'],
  cooldown: 0.1,
  ownerOnly: true,
  async run({ client, message, args, player, lang }) {
    
    if (!args[0]) return;

    const code = args.join(" ");
    if (!code) return;
        try {
          let result = await eval(code)
          if (typeof result !== "string") result = require("util").inspect(result, { depth: 0 })

          message.reply({
            content: `\`\`\`js\n${result.slice(0, 1970).replace((new RegExp(global.config.token,"gi")), '******************')}\`\`\``,
          })

        } catch (e) {
          message.reply({
            content: `\`\`\`js\n${e.stack.slice(0, 2000)}\`\`\``,
          });
        }
  },
};
