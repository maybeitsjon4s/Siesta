const { Embed } = require(`discord.js`)
const Emojis = require(`../../Structures/Utils/emojis`)

module.exports = {
  name: 'nowplaying',
  aliases: ['np', 'tocando'],
  cooldown: 3,
  ownerOnly: false,
  run: async (client, message, args, player, lang) => {

      if (!player) return message.reply(`**${Emojis.errado} » ${lang.commands.nowplaying.noPlayer}**`);
      
      const track = player.current;
      let embed = new Embed()
        .setTitle(`${Emojis.music} | __Siesta__`)
        .setColor(client.color)
        .setTimestamp()
        .setDescription(
          `**${Emojis.aurora} » ${lang.commands.nowplaying.info}\n${lang.commands.nowplaying.name}: [${track.title.replace("`", "'")}](${track.uri}) \n ${lang.commands.nowplaying.duration}: ${formatTime(
            client.utils.convertMilliseconds(player.position)
          )}\`[${client.utils.progressBarEnhanced(
            player.position / 1000 / 50,
            track.duration / 1000 / 50,
            20
          )}]\` ${formatTime(track.duration)}\n${Emojis.estrela} » Status\n Volume: \`${player.volume}/500\`\nLoop: \`${player.trackRepeat ? lang.commands.nowplaying.enabled : lang.commands.nowplaying.disabled}\`\nStatus: \`${!player.filters.player.paused ? lang.commands.nowplaying.playing : lang.commands.nowplaying.paused}\`**`
        )
        .setFooter({
          text: `${message.author.tag}`,
          iconURL: message.author.displayAvatarURL({
            dynamic: true
          })
        });
      message.reply({
        embeds: [embed]
      });
  },
};

function formatTime(time, format = "hh:mm:ss") {
  const formats = {
    dd: "days",
    hh: "hours",
    mm: "minutes",
    ss: "seconds"
  };

  const newFormat = format
    .replace(/dd|hh|mm|ss/g, (match) =>
      time[formats[match]].toString().padStart(2, "0")
    )
    .replace(/^(00:)+/g, "");

  return newFormat.length > 2 ? newFormat : "00:" + newFormat;
}
