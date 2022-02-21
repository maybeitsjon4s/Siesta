const Emojis = require(`../../../Structures/Utils/emojis`);
const Discord = require(`discord.js`);
const Guild = require("../../../database/Schemas/Guild")
module.exports = async (client, member) => {

  const guild = await Guild.findOne({ _id: member.guild.id, })
  if(!guild) return;

  //======================> Welcome <======================\\
  
  if (guild.welcome.status && !member.user.bot) {

    let channel = await member.guild.channels.cache.get(guild.welcome.channel);

    const row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setLabel(`Message configured by ${member.guild.name} team`)
        .setCustomId("welcome")
        .setStyle(`SECONDARY`)
        .setDisabled(true)
        .setEmoji(Emojis.ban)
    );

    channel.send({
      content: `${guild.welcome.message
        .replace(`{member}`, `${member}`)
        .replace(`{guild}`, `${member.guild.name}`)
        .replace(`{membertag}`, `${member.user.tag}`)
        .replace(`{count}`, `${member.guild.memberCount}`)}`,
      components: [row],
    });
  }
};
