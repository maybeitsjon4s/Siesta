const { MessageEmbed, MessageAttachment } = require('discord.js-light')
const Emojis = require('../../Structures/Utils/emojis.js')

const { loadImage, registerFont, createCanvas } = require("canvas");
const { fillTextWithTwemoji } = require('node-canvas-with-twemoji-and-discord-emoji');
registerFont("src/Assets/Fonts/seguibl.ttf", {
    family: "Segoe UI Black"
});
const { getColorFromURL } = require('color-thief-node');
module.exports = {
  name: 'nowplaying',
  aliases: ['np', 'tocando'],
  cooldown: 3,
  ownerOnly: false,
  description: '[ 🎵 Music ] Show some infos about the currently playing song.',
  options: [],
  async exec({ client, message, args, player, lang }) {
      if (!player) return message.reply(`**${Emojis.errado} › ${lang.commands.nowplaying.noPlayer}**`);


            const track = player.current;

            const color = await getColorFromURL(track.thumbnailUrl)

            const canvas = createCanvas(800, 400);
            const ctx = canvas.getContext("2d");

            ctx.fillStyle = 'rgb(' + color.join(', ') + ')'
            ctx.fillRect(0, 0, 800, 400)

            const trackThumbnail = await loadImage(track.thumbnailUrl)

            ctx.save();
            roundRect(390, 50, 400, 250, 50);
            ctx.clip();
            ctx.drawImage(trackThumbnail, 390, 50, 400, 250)
            ctx.restore();

            ctx.fillStyle = '#ffffff'
            ctx.font = '30px "Segoe UI Black"';
            ctx.textAlign = "left"

            ctx.fillText(client.utils.shorten(track.title, 19), 20, 80)
            ctx.font = '30px "Italic"';
            ctx.fillText(client.utils.shorten(player.current.author, 20), 20, 160)
            ctx.font = '80px "Segoe UI Black"';
            ctx.fillStyle = '#ffffff'
            await fillTextWithTwemoji(ctx, '<:before:953024307628474418> <:pause:953024535924457603> <:after:953024224388317325>', 20, 270)
            ctx.font = '20px "Segoe UI Black"'
            await fillTextWithTwemoji(ctx, `${module.exports.formatTime(client.utils.convertMilliseconds(player.position))} ${client.utils.progressBar(
              player.position / 1000 / 50,
              track.duration / 1000 / 50,
              30
            )} ${module.exports.formatTime(client.utils.convertMilliseconds(track.duration))}`, 20, 350)


            const attach = new MessageAttachment(canvas.toBuffer(), 'nowplaying.png');
            message.reply({ files: [attach]})

            function roundRect(x, y, width, height, radius) {
              ctx.beginPath();
              ctx.moveTo(x + radius, y);
              ctx.lineTo(x + width - radius, y);
              ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
              ctx.lineTo(x + width, y + height - radius);
              ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
              ctx.lineTo(x + radius, y + height);
              ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
              ctx.lineTo(x, y + radius);
              ctx.quadraticCurveTo(x, y, x + radius, y);
              ctx.closePath();
            }     
  },
          formatTime (time, format = "hh:mm:ss") {
            const formats = {
             dd: "days",
             hh: "hours",
             mm: "minutes",
             ss: "seconds"
             };
      
            const newFormat = format.replace(/dd|hh|mm|ss/g, (match) => time[formats[match]].toString().padStart(2, "0")).replace(/^(00:)+/g, "");
      
            return newFormat.length > 2 ? newFormat : "00:" + newFormat;
      },
}
