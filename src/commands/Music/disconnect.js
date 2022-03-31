const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
	name: 'disconnect',
	aliases: ['leave', 'parar', 'dc', 'desconectar', 'stop'],
	cooldown: 5,
	ownerOnly: false,
	description: '[ 🎵 Music ] Disconnect the bot from the voice channel.',
	options: [],
	async exec({ message, player, lang }) {

		if (!player) return message.reply(`**${Emojis.errado} › ${lang.commands.disconnect.noPlayer}**`);

		if (!message.member.voice.channel || message.member.voice.channel.id != message.guild.me.voice?.channel?.id) return message.reply(`**${Emojis.errado} › ${lang.commands.disconnect.channelError}**`);

		player.destroy();
		message.reply(`**${Emojis.music} › ${lang.commands.disconnect.sucess}**`);
    
	}
};
