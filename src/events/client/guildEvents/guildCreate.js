const moment = require("moment")
module.exports = async (client, guild) => {
  client.utils.sendLogs(`\`---\`\nData: **${moment(Date.now()).format("L LT")}\nFui adicionada no servidor: **${guild.name}** (\`${guild.id}\`)\nDono: **${(await guild.fetchOwner()).user.tag}** (\`${(await guild.fetchOwner()).user.id}\`)\n\`---\``)
};