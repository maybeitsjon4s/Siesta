export default {
  name: 'shuffle',
  aliases: ['embaralhar', 'misturar'],
  ownerOnly: false,
  playerOnly: true,
  sameChannel: true,
  description: '[ 🎵 Music ] Shuffle the queue.',
  options: [],
  async exec({ message,  player, t, client }) {
    
    if(!player.queue.length) return message.reply(`**${client.emj.errado} › ${t('commands:shuffle.noQueue')}**`);

    player.shuffleQueue();

    message.reply(`**${client.emj.music} › ${t('commands:shuffle.sucess')}**`);
  }
};
