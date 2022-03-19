const { create, all } = require('mathjs')
const Emojis = require("../../Structures/Utils/emojis")
module.exports = {
  name: 'calculator',
  aliases: ['calc', 'calculadora'],
  cooldown: 1,
  ownerOnly: false,
  async run({ client, message, args, player, lang }) {
    const math = create(all)
    const limited = math.evaluate

      math.import({
      'import': function () { throw new MathError() },
      'createUnit': function () { throw new MathError() },
      'evaluate': function () { throw new MathError() },
      'parse': function () { throw new MathError() },
      'simplify': function () { throw new MathError() },
      'derivative': function () { throw new MathError() },
      'format': function () { throw new MathError() },
      'zeros': function () { throw new MathError() },
      'ones': function () { throw new MathError() },
      'identity': function () { throw new MathError() },
      'range': function () { throw new MathError() },
      'matrix': function () { throw new MathError() }
    }, { override: true });

    const expression = args.join(' ').replace(/π/g, 'pi').replace(/÷|:/g, '/').replace(/×/g, '*').replace(/\*\*/g, '^').replace(/"|'|\[|\]|\{|\}/g, '').toLowerCase();

    if(!expression) return message.reply(`**${Emojis.errado} › ${lang.commands.calc.invalid}**`);
    let result;

    try {
    result = limited(expression)
    }
    catch(err) {
    return message.reply(`**${Emojis.errado} › ${lang.commands.calc.invalid}**`)
    }

    if(!result || typeof result === 'function') return message.reply(`**${Emojis.errado} › ${lang.commands.calc.invalid}**`);
    if([Infinity, -Infinity, 'NaN'].includes(result)) return message.reply((`**${Emojis.errado} › ${lang.commands.calc.noResult}**`));

    message.reply(`**${Emojis.star} › ${lang.commands.calc.sucess.replace('{}', result.toLocaleString())}**`)
  }
}
