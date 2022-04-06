const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
  name: 'seek',
  aliases: [],
  ownerOnly: false,
  playerOnly: true,
  sameChannel: true,
  description: '[ 🎵 Music ] Seek to a specific time.',
  options: [
    {
      name: 'time',
      description: 'The time that i will jump to.',
      type: 'STRING',
      required: true
    }
  ],
  async exec({ client, message, args, player, lang }) {

    if (!args[0] || !client.utils.timeToMS(args[0])) return message.reply(`**${Emojis.errado} › ${lang.commands.seek.invalidTime}**`);

    const time = client.utils.timeToMS(args[0]);
    const position = player.position;
    const duration = player.current.duration;

    if (time <= duration) {
      if (time > position) {
        player.seek(time);
        return message.reply({
          content: `**${Emojis.music} ›** ***${lang.commands.seek.goingTo} ${client.utils.formatTime(time)}...***`,
        });
      } else {
        player.seek(time);
        return message.reply({
          content: `**${Emojis.music} ›** ***${lang.commands.seek.backingTo} ${client.utils.formatTime(time)}...***`,
        });
      }
    } else {
      return message.reply(`**${Emojis.errado} › ${lang.commands.seek.exceeds}**`);
    }
  },
};
