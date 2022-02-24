import { findOne } from "../../../database/Schemas/Guild.js";

export default async (client, oldMessage, message) => {
  const GUILD = await findOne({ _id: message.guild.id, })
  if(!GUILD || message.author.bot) return;

  if (message.content == oldMessage.content) return;
  client.emit("messageCreate", message);
  }
