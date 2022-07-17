export default {
  name: 'resume',
  aliases: ['pausar', 'dispause', 'continuar'],
  ownerOnly: false,
  playerOnly: true,
  sameChannel: true,
  description: '[ 🎵 Music ] Resumes the player.',
  options: [],
  async exec({ message, player, t, client }) {

    if (!player.paused) return message.reply(`**${client.emotes.errado} › ${t('commands:resume.alteradyPause')}!**`);

    player.pause(false);
    message.reply(`**${client.emotes.music} › ${t('commands:resume.sucess')}!**`);
  },
};
