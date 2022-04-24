const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
    name: 'loop',
    aliases: ['repetir', 'repeat'],
    ownerOnly: false,
    playerOnly: true,
    sameChannel: true,
    description: '[ 🎵 Music ] Enable/Disable the track/queue loop.',
    options: [],
    async exec({ message, player, t }) {

        if (!player.queue.length) {
            player.setTrackLoop(!player.trackRepeat);
            const trackRepeat = player.trackRepeat ? t('commands:loop.enable') : t('commands:loop.disable');
            message.reply(`**${Emojis.music} › ${trackRepeat} ${t('commands:loop.trackSucess')}!**`);

        } else {
            player.setQueueLoop(!player.queueRepeat);
            const queueRepeat = player.queueRepeat ? t('commands:loop.enable') : t('commands:loop.disable');
            message.reply(`**${Emojis.music} › ${queueRepeat} ${t('commands:loop.queueSucess')}!**`);
        }
    }
};

