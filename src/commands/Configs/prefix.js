const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
	name: 'prefix',
	aliases: ['setprefix', 'prefixo'],
	ownerOnly: false,
	async exec({ client, message, args, lang }) { 

		if (!message.member.permissions.has('MANAGE_GUILD') && !client.owners.some(id => id === message.author.id) ) return message.reply(`${Emojis.errado}** › ${lang.commands.prefix.errorPerm}**`);

		if (!args[0]) return message.reply(`${Emojis.errado}** › ${lang.commands.prefix.noPrefix}**`);

		if (args[0].length > 7) return message.reply(`${Emojis.errado}** › ${lang.commands.prefix.sevenLenght}**`);

		await client.db.guild.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$set: {
				prefix: args[0]
			}
		});
		message.reply(`${Emojis.config}** › Novo prefix setado com sucesso!**`);
	}
};
