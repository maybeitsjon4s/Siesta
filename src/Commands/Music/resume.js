const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
    name: 'resume',
    aliases: ['pausar', 'dispause', 'continuar'],
    ownerOnly: false,
    playerOnly: true,
    sameChannel: true,
    description: '[ 🎵 Music ] Resumes the player.',
    options: [],
    async exec({ message, player, t }) {

        if (!player.paused) return message.reply(`**${Emojis.errado} › ${t('commands:resume.alteradyPause')}!**`);

        player.pause(false);
        message.reply(`**${Emojis.music} › ${t('commands:resume.sucess')}!**`);
    },
};
