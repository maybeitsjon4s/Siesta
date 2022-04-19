const Emojis = require('../../Structures/Utils/emojis.js');

module.exports = {
  name: 'skipto',
  aliases: ['goto', 'jump'],
  ownerOnly: false,
  playerOnly: true,
  sameChannel: true,
  description: '[ 🎵 Music ] Skips to a specific song.',
  options: [
    {
      name: 'song',
      description: 'The number of the song in the queue',
      type: 'NUMBER',
      required: true
    }
  ],
  async exec({ message, args, player, t }) {

    const position = Number(args[0]);

    if(!position || isNaN(position) || position < 0 || position > player.queue.length) return message.reply(`**${Emojis.errado} › ${t('commands:skipto.invalidPosition')}**`);

    player.skip(position);
    message.reply(`**${Emojis.music} › ${t('commands:skipto.sucess',{
      position: position
    })}**`);
  }
};
