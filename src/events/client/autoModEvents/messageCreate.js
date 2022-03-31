const Emojis = require('../../../Structures/Utils/emojis');

module.exports = async (client, message) => {
	if (!message.guild) return;

	const GUILD = await client.db.guild.findOne({
		_id: message.guild.id
	});
	if (!GUILD) return;

	if (GUILD.antiinvite.status && message.member) {
		if (['BAN_MEMBERS', 'KICK_MEMBERS','ADMINISTRATOR', 'MANAGE_CHANNELS', 'MANAGE_GUILD', 'MANAGE_MESSAGES', 'MANAGE_ROLES'].some(perm => message.member.permissions.has(perm))) return;

		let lang = GUILD.lang || 0;

		switch(lang) {
		case 1:
			lang = client.langs.pt;
			break;
		case 0:
			lang = client.langs.en;
			break;
		}

		const regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gi;

		const whitelist = GUILD.antiinvite.whitelist;

		if (regex.exec(message.content) && !whitelist.some(x => x == message.channel.id)) {
			message.channel.send(`**${Emojis.errado} › ${message.author} ` + lang.events.autoModEvents.antiinvite + '**');
			message.delete().catch(() => {});
		}
	}
};
