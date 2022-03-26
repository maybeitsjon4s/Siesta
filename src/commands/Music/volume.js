const Emojis = require(`../../Structures/Utils/emojis`);

module.exports = {
  name: 'volume',
  aliases: ['vol'],
  cooldown: 2,
  ownerOnly: false,
  description: '[ 🎵 Music ] Changes the player volume.',
  options: [
    {
      name: 'volume',
      description: 'The volume number 1 - 500',
      type: 'NUMBER',
      required: true
    }
  ],
  async exec({ client, message, args, player, lang }) {

    
      if (!player) return message.reply(`**${Emojis.errado} › ${lang.commands.volume.noPlayer}**`);

      if (!message.member.voice.channel || message.member.voice.channel.id != message.guild.me.voice.channel.id)return message.reply(
          `**${Emojis.errado} › ${lang.commands.volume.channelError}**`);

      if (Number(args[0]) <= 0 || Number(args[0]) > 500 || isNaN(args[0])) return message.reply(`**${Emojis.errado} › ${lang.commands.volume.bettewnOneAnd500}**`);

      player.filters.setVolume(Number(args[0]));
      message.reply(`**${Emojis.music} › ${lang.commands.volume.sucess} ${Number(args[0])}**`);
  }
}
