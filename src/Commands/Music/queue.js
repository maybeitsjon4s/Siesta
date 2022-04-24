const { MessageEmbed } = require('discord.js-light');
const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
    name: 'queue',
    aliases: ['q', 'fila'],
    ownerOnly: false,
    playerOnly: true,
    sameChannel: false,
    description: '[ 🎵 Music ] See the queue',
    options: [{
        name: 'page',
        description: 'The page of the queue you wanna see, by default its the page 1',
        type: 'NUMBER',
        required: false
    }],
    async exec({ client, message, args, player, t }) {

      
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
            name: `${t('commands:queue.current')}`,
            value: `**[${player.current.title}](${player.current.uri})**`
        });

        if (!tracks.length) QUEUE.setDescription(`**${t('commands:queue.noTracks')} ${page > 1 ? `${t('commands:queue.page')} ${page}**` : `${t('commands:queue.queue')}**`}`);
        else
            QUEUE.setDescription(tracks.map((track, i) => `**${start + ++i} - [${client.utils.shorten(track.title, 30).replaceAll('[', '').replaceAll(']', '')}](${track.uri}) < <@${track.requester.id}> >**`).join('\n'));

        const maxPages = Math.ceil(queue.length / multiple);

        QUEUE.setFooter({ text: `${t('commands:queue.page')} ${page > maxPages ? maxPages : page}/${maxPages} ` });
        message.reply({ embeds: [QUEUE] });
    }
};
