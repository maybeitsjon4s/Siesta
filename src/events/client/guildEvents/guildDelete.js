import moment from "moment";
import { findOneAndDelete } from "../../../database/Schemas/Guild.js";

export default async (client, guild) => {
  client.utils.sendLogs(`\`---\`Data: **${moment(Date.now()).format("L LT")}\nFui removida do servidor: **${guild.name}** (\`${guild.id}\`)\nDono: **${(await guild.fetchOwner()).user.tag}** (\`${(await guild.fetchOwner()).user.id}\`)\n\`---\``)
  await findOneAndDelete({ _id: guild.id }).catch(() => {})
};