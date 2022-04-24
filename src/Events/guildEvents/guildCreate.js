const Day = require('dayjs');

module.exports = { 
    name: 'guildCreate',
    async exec (client, guild) {
        client.utils.sendLogs({
            type: 'guild',
            content: `\`---\`\nData: **${Day(Date.now()).format('DD/MM/YYYY HH:mm:ss')}**\nFui adicionada no servidor: **${guild.name}** (\`${guild.id}\`)\nDono: **${(await guild.fetchOwner()).user.tag}** (\`${(await guild.fetchOwner()).user.id}\`)\n\`---\``
        });
    }
};
