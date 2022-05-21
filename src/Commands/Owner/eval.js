import { inspect } from 'util';

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
    type: 'STRING',
    required: true
  }],
  async exec({ message, client, player, args, t }) {
    
    if (!args[0]) return;

    const code = args.join(' ');
    if (!code) return;
    try {
      let result = await eval(code);
      if (typeof result !== 'string') result = inspect(result, { depth: 0 });

      message.reply({
        content: `**${client.Emojis.certo} › Sucess\nOutput: \`\`\`js\n${result.slice(0, 1900).replace((new RegExp(global.config.token,'gi')), '')}\`\`\`**`});

    } catch (e) {
      message.reply({
        content: `**${client.Emojis.errado} › Error\nOutput: \`\`\`js\n${e.stack.slice(0, 1900)}\`\`\`**`,

      });
    }
  },
};
