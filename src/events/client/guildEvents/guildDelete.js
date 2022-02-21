const moment = require("moment");
const Guild = require("../../../database/Schemas/Guild");
module.exports = async (client, guild) => {
  client.utils.sendLogs(`\`---\`Data: **${moment(Date.now()).format("L LT")}\nFui removida do servidor: **${guild.name}** (\`${guild.id}\`)\nDono: **${(await guild.fetchOwner()).user.tag}** (\`${(await guild.fetchOwner()).user.id}\`)\n\`---\``)
  await Guild.findOneAndDelete({ _id: guild.id }).catch(() => {})
};