export default {
  name: 'pause',
  aliases: ['pausar'],
  playerOnly: true,
  sameChannel: true,
  ownerOnly: false,
  description: '[ 🎵 Music ] Pauses the currently playing track.',
  options: [],
  async exec({ message, player, t, client }) {

    if (player.paused) return message.reply(`**${client.emj.errado} › ${t('commands:pause.alteradyPause')}!**`);

    player.pause(true);
    message.reply(`**${client.emj.music} › ${t('commands:pause.sucess')}!**`);
    
  }
};
