export default {
  name: 'autoplay',
  aliases: [],
  ownerOnly: false,
  playerOnly: true,
  sameChannel: true,
  description: '[ 🎵Music ] Enable/disable the autoplay',
  options: [],
  async exec({ message, player, t, client }) {

    if (player.autoplay) {
      player.autoplay.status = false;
      player.autoplay.track = null;
      message.reply(`**${client.emotes.music} › ${t('commands:autoplay.disabled')}**`);
    } else {
      player.autoplay = {
        status: true,
        track: player.current
      };
      message.reply(`**${client.emotes.music} › ${t('commands:autoplay.activated')}**`);
    }
  },
};
