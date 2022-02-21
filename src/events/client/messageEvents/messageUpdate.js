const { MessageEmbed } = require(`discord.js`);
const Guild = require("../../../database/Schemas/Guild")
const Emojis = require(`../../../Structures/Utils/emojis`);
module.exports = async (client, oldMessage, message) => {
  const GUILD = await Guild.findOne({ _id: message.guild.id, })
  if(!GUILD || message.author.bot) return;

  if (message.content == oldMessage.content) return;
  client.emit("messageCreate", message);
  }
