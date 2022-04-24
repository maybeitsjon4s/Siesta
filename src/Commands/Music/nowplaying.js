const Emojis = require('../../Structures/Utils/emojis.js');
const { MessageEmbed } = require('discord.js-light');
module.exports = {
    name: 'nowplaying',
    aliases: ['np', 'tocando'],
    ownerOnly: false,
    playerOnly: true,
    sameChannel: false,
    description: '[ 🎵 Music ] Show some infos about the currently playing song.',
    options: [],
    async exec({ client, message, player, t }) {
    
      
        const track = player.current;
        const embed = new MessageEmbed()
            .setTitle(`${Emojis.music} | __Siesta__`)
            .setColor(client.color)
            .setTimestamp()
            .setDescription(`**${Emojis.aurora} › ${t('commands:nowplaying.info')}\n${t('commands:nowplaying.name')}: [${track.title.replace('`', '\'')}](${track.uri}) \n ${t('commands:nowplaying.duration')}: ${formatTime(
                client.utils.convertMilliseconds(player.position)
            )}\`[${client.utils.progressBar(
                player.position / 1000 / 50,
                track.duration / 1000 / 50,
                20
            )}]\` ${formatTime(
                client.utils.convertMilliseconds(track.duration)
            )}\n${Emojis.estrela} › Status\n Volume: \`${player.volume}/500\`\nLoop: \`${player.trackRepeat ? t('commands:nowplaying.enabled') : t('commands:nowplaying.disabled')}\`\nStatus: \`${!player.filters.player.paused ? t('commands:nowplaying.playing') : t('commands:nowplaying.paused')}\`**`)
            .setFooter({
                text: `${message.author.tag}`,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
            });
        message.reply({ embeds: [embed] });
    },
};

function formatTime(time, format = 'hh:mm:ss') {
    const formats = {
        dd: 'days',
        hh: 'hours',
        mm: 'minutes',
        ss: 'seconds'
    };

    const newFormat = format.replace(/dd|hh|mm|ss/g, (match) => time[formats[match]].toString().padStart(2, '0')).replace(/^(00:)+/g, '');

    return newFormat.length > 2 ? newFormat : '00:' + newFormat;
}
