const Day = require('dayjs');
module.exports = async (client, guild) => {
  client.utils.sendLogs(`\`---\`\nData: **${Day(Date.now()).format('DD/MM/YYYY HH:mm:ss')}**\nFui adicionada no servidor: **${guild.name}** (\`${guild.id}\`)\nDono: **${(await guild.fetchOwner()).user.tag}** (\`${(await guild.fetchOwner()).user.id}\`)\n\`---\``);
};