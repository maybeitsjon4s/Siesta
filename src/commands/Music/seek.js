const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
  name: 'seek',
  aliases: [],
  cooldown: 2,
  ownerOnly: false,
  async run({ client, message, args, player, lang }) {

      if (!player) return message.reply(`**${Emojis.errado} › ${lang.commands.seek.noPlayer}**`);

      if (!message.member.voice.channel || message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.reply(
          `**${Emojis.errado} › ${lang.commands.seek.channelError}**`);

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
