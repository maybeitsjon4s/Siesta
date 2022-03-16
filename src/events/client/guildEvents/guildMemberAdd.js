const Emojis = require('../../../Structures/Utils/emojis')
const { MessageActionRow, MessageButton, ButtonStyle } = require('discord.js')

module.exports = async (client, member) => {

  const guild = await client.db.guild.findOne({ _id: member.guild.id, })
  if(!guild) return;
  
  if (guild.welcome.status && !member.user.bot) {

    let channel = await member.guild.channels.cache.get(guild.welcome.channel);

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel(`Message configured by ${member.guild.name} team`)
        .setCustomId('welcome')
        .setStyle('SECONDARY')
        .setDisabled(true)
        .setEmoji({
          name: 'lock',
          id: '910274452632264804',
          animated: false
        })
    );

    channel.send({
      content: `${guild.welcome.message
        .replace('{member}', `${member}`)
        .replace('{guild}', `${member.guild.name}`)
        .replace('{membertag}', `${member.user.tag}`)
        .replace('{count}', `${member.guild.memberCount}`)}`,
      components: [row],
    });
  }
};
