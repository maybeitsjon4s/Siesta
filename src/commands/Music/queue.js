const { MessageEmbed } = require('discord.js');
const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
  name: 'queue',
  aliases: ['q', 'fila'],
  cooldown: 4,
  ownerOnly: false,
  run: async (client, message, args, player, lang) => {

      if (!player) return message.reply(`**${Emojis.errado} › ${lang.commands.queue.noPlayer}**`);
      
      const queue = player.queue;

      const QUEUE = new MessageEmbed()
        .setTitle(`${Emojis.music} | __Siesta__`)
        .setColor(client.color)
        .setTimestamp();

      const multiple = 10;
      const page = args.length && Number(args[0]) ? Number(args[0]) : 1;

      const end = page * multiple;
      const start = end - multiple;

      const tracks = queue.slice(start, end);

      if (player.current) QUEUE.addFields({
           name: `${lang.commands.queue.current}`,
           value: `**[${player.current.title}](${player.current.uri})**`
          });

      if (!tracks.length) QUEUE.setDescription(`**${lang.commands.queue.noTracks} ${page > 1 ? `${lang.commands.queue.page} ${page}**` : `${lang.commands.queue.queue}**`}`);
      else
        QUEUE.setDescription(tracks.map((track, i) => `**${start + ++i} - [${client.utils.shorten(track.title, 30).replaceAll('[', '').replaceAll(']', '')}](${track.uri}) < <@${track.requester.id}> >**`).join(`\n`));

      const maxPages = Math.ceil(queue.length / multiple);

      QUEUE.setFooter({ text: `${lang.commands.queue.page} ${page > maxPages ? maxPages : page}/${maxPages} ` });
      message.reply({ embeds: [QUEUE] });
  }
}
