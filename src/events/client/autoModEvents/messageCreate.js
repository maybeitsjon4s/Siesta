const Emojis = require(`../../../Structures/Utils/emojis`);
const Guild = require("../../../database/Schemas/Guild")
module.exports = async (client, message) => {
if (!message.guild) return;

    let GUILD = await Guild.findOne({
      _id: message.guild.id
    })
    if (!GUILD) return;

    if (GUILD.antiinvite.status && message.member) {
      if (
        message.member.permissions.has([
          `BAN_MEMBERS`,
          `KICK_MEMBERS`,
          `ADMINISTRATOR`,
          `MANAGE_CHANNELS`,
          `MANAGE_GUILD`,
          `MANAGE_MESSAGES`,
          `MANAGE_ROLES`,
        ])
      )
        return;

  let lang = GUILD.lang || 0

  switch(lang) {
    case 1:
    lang = client.langs.pt
    break;
    case 0:
    lang = client.langs.en
    break;
  }

      const regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gi;

      const whitelist = GUILD.antiinvite.whitelist

      if (regex.exec(message.content) && !whitelist.some(x => x == message.channel.id)) {
        message.channel.send(`**${Emojis.errado} » ${message.author} ` + lang.events.autoModEvents.antiinvite + '**')
        message.delete().catch((a) => {});
      }
    }
}
