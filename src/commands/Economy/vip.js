const { MessageEmbed } = require('discord.js')
const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
  name: 'vip',
  aliases: [],
  cooldown: 4,
  ownerOnly: false,
  run: async (client, message, args, player, lang) => {

        const embed = new MessageEmbed()
          .setTitle(`${Emojis.dima} | __Siesta__`)
          .setColor(client.color)
          .setTimestamp()
          .setFooter({
            text: message.author.tag,
            iconURL: message.author.displayAvatarURL({ dynamic: true }),
          })
          .addFields(
            {
              name: lang.commands.vip.info[0].toString(),
              value: lang.commands.vip.info[1].toString()
            },
            {
              name: lang.commands.vip.price[0].toString(),
              value: lang.commands.vip.price[1].toString()
            }
          )
          
        message.reply({ embeds: [embed] });

  },
};
