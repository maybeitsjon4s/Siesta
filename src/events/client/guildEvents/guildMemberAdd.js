import { ban } from "../../../Structures/Utils/emojis.js";
import { MessageActionRow, MessageButton } from "discord.js";
import { findOne } from "../../../database/Schemas/Guild.js";

export default async (client, member) => {

  const guild = await findOne({ _id: member.guild.id, })
  if(!guild) return;

  //======================> Welcome <======================\\
  
  if (guild.welcome.status && !member.user.bot) {

    let channel = await member.guild.channels.cache.get(guild.welcome.channel);

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel(`Message configured by ${member.guild.name} team`)
        .setCustomId("welcome")
        .setStyle(`SECONDARY`)
        .setDisabled(true)
        .setEmoji(ban)
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
