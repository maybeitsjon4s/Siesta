export default {
  name: 'remove',
  aliases: ['removetrack'],
  ownerOnly: false,
  playerOnly: true,
  sameChannel: true,
  description: '[ 🎵Music ] Removes one specific track from the queue.',
  options: [{
    name: 'track',
    description: 'The number of the track you wanna remove (see the number in /queue)',
    type: 'NUMBER',
    required: true
  }],
  async exec({ args, message, player, t, client }) {

    if(!Number(args[0]) || Number(args[0]) > player.queue.length || Number(args[0] < 0)) return message.reply(`**${client.emj.errado} › ${t('commands:remove.invalidTrack')}**`);

    message.reply(`**${client.emj.music} › ${t('commands:remove.removed', {
      track: player.queue[Number(args[0] - 1)].title
    })}**`);

    player.queue.splice(Number(args[0]) - 1, 1);
  }
};
