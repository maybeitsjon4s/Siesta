const { MessageEmbed } = require('discord.js');
const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
  name: 'cooldowns',
  aliases: ['tempos', 'times', 'cd'],
  ownerOnly: false,
  run: async (client, message, args, player, lang) => {

      const user = await client.db.user.findOne({
        _id: message.author.id
      })

        let embed = new MessageEmbed()
          .setTimestamp()
          .setTitle(`${Emojis.rocket} | __Siesta__`)
          .setColor(client.color)
          .setFooter({
            text: message.author.tag,
            iconURL: message.author.displayAvatarURL({
              dynamic: true
            }),
          })
          .setDescription(
            `**[ ${Emojis.dima} Economia ]** \n\n ${user.cooldowns.work !== null && 600000 - (Date.now() - user.cooldowns.work) > 0 ? `${Emojis.errado} › Work:** ${client.utils.formatTime(
              client.utils.convertMilliseconds(600000 - (Date.now() - user.cooldowns.work))
            )} **` : `${Emojis.certo} › Work:** ${lang.commands.cooldowns.canUse}!**`} \n ${user.cooldowns.daily !== null && 86400000 - (Date.now() - user.cooldowns.daily) > 0 ? `${Emojis.errado} › Daily:** ${client.utils.formatTime(
              client.utils.convertMilliseconds(86400000 - (Date.now() - user.cooldowns.daily))
            )} **` : `${Emojis.certo} › Daily:** ${lang.commands.cooldowns.canUse}!**`} \n ${user.cooldowns.mine !== null && 1999999 - (Date.now() - user.cooldowns.mine) > 0 ? `${Emojis.errado} › Mine:** ${client.utils.formatTime(
              client.utils.convertMilliseconds(1999999 - (Date.now() - user.cooldowns.mine))
            )} **` : `${Emojis.certo} › Mine:** ${lang.commands.cooldowns.canUse}!**`}`
          );

        message.reply({
          embeds: [embed]
        });
  }
}
