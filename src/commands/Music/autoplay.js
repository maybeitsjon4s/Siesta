const Emojis = require('../../Structures/Utils/emojis.js');

module.exports = {
	name: 'autoplay',
	aliases: [],
	ownerOnly: false,
	description: '[ Music ] Enable/disable the autoplay',
	options: [],
	async exec({  message, player, lang }) {

		if(!player) return message.reply(`**${Emojis.errado} › ${lang.commands.autoplay.noPlayer} **`);
		if(!message.member.voice?.channel || message.member.voice.channel.id !== player.voiceChannelId) return message.reply(`**${Emojis.errado} › ${lang.commands.autoplay.channelError}**`);
    
		if(player.autoplay) {
			player.autoplay = false;
			message.reply(`**${Emojis.music} › ${lang.commands.autoplay.disabled}**`);
		} else {
			player.autoplay = true;
			message.reply(`**${Emojis.music} › ${lang.commands.autoplay.activated}**`);
		}
	},
};
