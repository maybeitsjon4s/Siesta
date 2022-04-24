const Emojis = require('../../Structures/Utils/emojis.js');
const i18next = require('i18next');

module.exports =  {
    name: 'messageCreate',
    async exec(client, message) {
        if (!message.guild) return;

        const GUILD = await client.db.guild.findOne({
            _id: message.guild.id
        });
        if (!GUILD) return;

        if (GUILD.antiinvite.status && message.member) {
            if (message.member.permissions.has('MANAGE_MESSAGES')) return;

            let t = GUILD.lang || 0;

            switch(t) {
            case 1:
                t = i18next.getFixedT('pt-BR');
                break;
            case 0:
                t = i18next.getFixedT('en-US');
                break;
            }

            const regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gi;

            const whitelist = GUILD.antiinvite.whitelist;

            if (regex.exec(message.content) && !whitelist.some(x => x == message.channel.id)) {
                message.channel.send(`**${Emojis.errado} › ${message.author} ` + t('events:autoModEvents.antiinvite') + '**');
                message.delete().catch(() => {});
            }
        }
    }
};
