import { inspect } from 'util';
import { ApplicationCommandOptionType } from 'discord.js'

export default {
  name: 'eval',
  aliases: ['e', 'ev'],
  ownerOnly: true,
  playerOnly: false,
  sameChannel: false,
  description: '[ ❄️ Developers ] Evaluates a code.',
  options: [{
    name: 'code',
    description: 'The code',
    type: ApplicationCommandOptionType.String,
    required: true
  }],
  async exec({ message, client, args }) {

    const expr = args.join(' ');
    if (!expr) return;
    let res;
    try {
      res = await eval(expr);
      if (typeof res !== 'string') res = inspect(res, { depth: 0 });
      message.reply({
        content: `**${client.emotes.certo} › Sucess\nOutput: \`\`\`js\n${res.slice(0, 1900).replace((new RegExp(global.config.token, 'gi')), '')}\`\`\`**`
      });
    } catch (error) {
      return message.reply({
        content: `**${client.emotes.errado} › Error\nOutput: \`\`\`js\n${error.stack.slice(0, 1900)}\`\`\`**`,
      });
    }
  },
};
