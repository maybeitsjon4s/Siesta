const Emojis = require(`../../Structures/Utils/emojis`);

module.exports = {
  name: 'loop',
  aliases: ['repetir', 'repeat'],
  cooldown: 3,
  ownerOnly: false,
  async run({ client, message, args, player, lang }) {
       if (!player)
        return message.reply(
          `**${Emojis.errado} › ${lang.commands.loop.noPlayer}!**`
        );

      if (!message.member.voice.channel) return message.reply(`**${Emojis.errado} › ${lang.commands.loop.channelError}!**`);

      if (message.member.voice.channel.id !== player.voiceChannelId) return message.reply(`**${Emojis.errado} › ${lang.commands.loop.channelError2}!**`);

      if (!player.queue.length) {
        player.setTrackLoop(!player.trackRepeat);
        const trackRepeat = player.trackRepeat ? lang.commands.loop.enable : lang.commands.loop.disable;
      message.reply(`**${Emojis.music} › ${trackRepeat} ${lang.commands.loop.trackSucess}!**`);

      } else {
        player.setQueueLoop(!player.queueRepeat);
        const queueRepeat = player.queueRepeat ? lang.commands.loop.enable : lang.commands.loop.disable;
        message.reply(`**${Emojis.music} › ${queueRepeat} ${lang.commands.loop.queueSucess}!**`);
      }
  }
}

