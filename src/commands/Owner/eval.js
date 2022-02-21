const Emojis = require(`../../Structures/Utils/emojis`);
 const Guild = require("../../database/Schemas/Guild")
const { MessageEmbed } = require(`discord.js`);

module.exports = {
  name: `eval`,
  aliases: ["e", "ev"],
  cooldown: 0.000001,
  run: async (client, message, args, player, lang) => {
    if (!client.owners.some((x) => x === message.author.id)) return;
    if (!args[0]) return;

    const code = args.join(" ");
    if (!code) return;
    await message
      .reply(`**${Emojis.dev} » Executando o codigo...**`)
      .then(async (m) => {
        try {
          let pingStart = process.hrtime();
          let result = await eval(code);
          if (result instanceof Promise) {
            await result;
          }

          if (typeof result !== "string") result = require("util").inspect(result);

          let pingStop = process.hrtime(pingStart);
          let time = Math.round((pingStop[0] * 1e9 + pingStop[1]) / 1e6);

          m.edit({
            content: `\`\`\`js\n${result.slice(0, 1970).replace((new RegExp(process.env.TOKEN,"gi")), '******************')}\`\`\`\n\n\`\`\`${time}ms\`\`\``,
          })

        } catch (e) {
          m.edit({
            content: `\`\`\`js\n${e.stack.slice(0, 2000)}\`\`\``,
          });
        }
      });
  },
};
