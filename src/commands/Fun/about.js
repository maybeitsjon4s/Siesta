const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
	name: 'aboutme',
	aliases: ['sobremim', 'about', 'sobre'],
	cooldown: 6,
	ownerOnly: false,
	description: '[ 📚 Utils ] Change your about-me in the profile.',
	options: [{
		name: 'text',
		description: 'The text that will be seted as your aboutme.',
		type: 'STRING',
		required: true
	}],
	async exec({ client, message, args, lang }) {

		const aboutme = args.join(' ');
		if (!aboutme) return message.reply(`**${Emojis.errado} › ${lang.commands.about.noArgs}**`);

		message.reply(`**${Emojis.heart} › ${lang.commands.about.sucess}!**`);
		await client.db.user.findOneAndUpdate({ _id: message.author.id },
			{
				$set: {
					about: aboutme
				}
			});
	},
};
