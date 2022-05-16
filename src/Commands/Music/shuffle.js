export default {
  name: 'shuffle',
  aliases: ['embaralhar', 'misturar'],
  ownerOnly: false,
  playerOnly: true,
  sameChannel: true,
  description: '[ 🎵 Music ] Shuffle the queue.',
  options: [],
  async exec({ message,  player, t, client }) {
    
    if(!player.queue.length) return message.reply(`**${client.Emojis.errado} › ${t('commands:suffle.noQueue')}**`);

    player.shuffleQueue();

    message.reply(`**${client.Emojis.music} › ${t('commands:shuffle.sucess')}**`);
  }
};
