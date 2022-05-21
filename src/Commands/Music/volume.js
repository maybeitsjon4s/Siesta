export default {
  name: 'volume',
  aliases: ['vol'],
  ownerOnly: false,
  playerOnly: true,
  sameChannel: true,
  description: '[ 🎵 Music ] Changes the player volume.',
  options: [
    {
      name: 'volume',
      description: 'The volume number 1 - 500',
      type: 'NUMBER',
      required: true
    }
  ],
  async exec({ message, args, player, t, client }) {

    if (Number(args[0]) <= 0 || Number(args[0]) > 500 || isNaN(args[0])) return message.reply(`**${client.emj.errado} › ${t('commands:volume.bettewnOneAnd500')}**`);

    player.filters.setVolume(Number(args[0]));
    message.reply(`**${client.emj.music} › ${t('commands:volume.sucess')} ${Number(args[0])}**`);
  }
};
