export default {
  name: 'disconnect',
  aliases: ['leave', 'parar', 'dc', 'desconectar', 'stop', 'clearqueue'],
  ownerOnly: false,
  playerOnly: true,
  sameChannel: true,
  description: '[ 🎵 Music ] Disconnect the bot from the voice channel.',
  options: [],
  async exec({ message, player, t, client }) {

    player.destroy();
    message.reply(`**${client.Emojis.music} › ${t('commands:disconnect.sucess')}**`);
    
  }
};
