const Emojis = require('../../Structures/Utils/emojis.js');

module.exports = {
  name: 'shuffle',
  aliases: ['embaralhar', 'misturar'],
  ownerOnly: false,
  playerOnly: true,
  sameChannel: true,
  description: '[ 🎵 Music ] Shuffle the queue.',
  options: [],
  async exec({ message,  player, lang }) {
    
    if(!player.queue.length) return message.reply(`**${Emojis.errado} › ${lang.commands.suffle.noQueue}**`);

    player.shuffleQueue();

    message.reply(`**${Emojis.music} › ${lang.commands.shuffle.sucess}**`);
  }
};
