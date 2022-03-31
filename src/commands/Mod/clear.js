const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
	name: 'clear',
	aliases: ['limpar', 'clean'],
	cooldown: 2,
	ownerOnly: false,
	async exec({ client, message, args, lang }) {

		if (!message.member.permissions.has('MANAGE_MESSAGES') && !client.owners.some(id => id === message.author.id) )
			return message.reply(`**${Emojis.errado} › ${lang.commands.clear.userPermission}**`);

		if (!message.guild.me.permissions.has('MANAGE_MESSAGES'))
			return message.reply(
				`**${Emojis.errado} › ${lang.commands.clear.myPermission}**`
			);

		const deleteCount = parseInt(args[0], 10);
		if (!deleteCount || deleteCount < 1 || deleteCount > 99)
			return message.reply(`**${Emojis.errado} › ${lang.commands.clear.invalidCount}**`);

		const fetched = await message.channel.messages.fetch({
			limit: deleteCount + 1,
		});


		message.channel.bulkDelete(fetched);
		message.channel.send(`**${Emojis.ban} › ${lang.commands.clear.finalMessage.replace('{}', deleteCount)}!**`).then((msg) => {
			setTimeout(() => {
				msg.delete();
			}, 5000);
		});
	},
};
