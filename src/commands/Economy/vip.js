const { MessageEmbed } = require('discord.js')
const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
  name: 'vip',
  run: async (client, message, args, player, lang) => {
    try {
          const G = await client.db.guild.findOne({ _id: message.guild.id })
    const pt = G.lang
    const en = G.lang
      if (pt == 1) {
        let embed = new MessageEmbed()
          .setTitle(`${Emojis.dima} | __Siesta__`)
          .setColor(client.color)
          .setTimestamp()
          .setFooter({
            text: message.author.tag,
            iconURL: message.author.displayAvatarURL({ dynamic: true }),
          })
          .addField(
            `Vantagens`,
            `**»** Dobro de diamantes no **daily e work ** \n **»** Cargo exclusivo no [Servidor da Siesta](https://discord.gg/BRQccw7HhZ)\n**»** Saber as novidades da Siesta antes de qualquer um!`)
          .addField(
            `Preço`,
            `**»** Custa 250.000 diamantes para mais informações utilize o comando de loja!`
          );
        message.reply({ embeds: [embed] });
      }
      if (!en) {
        let embed = new MessageEmbed()
          .setTitle(`${Emojis.dima} | __Siesta__`)
          .setColor(client.color)
          .setTimestamp()
          .setFooter({
            text: message.author.tag,
            iconURL: message.author.displayAvatarURL({ dynamic: true }),
          })
          .addField(
            `Advantages`,
            `**»** Double of diamonds on **daily, work and mine** \n **»** Exclusive role on [Siesta Support server](https://discord.gg/BRQccw7HhZ)`
          )
          .addField(
            `Price`,
            `**»** Its 250.000 diamonds, for more information use shop command!`
          );

        message.reply({ embeds: [embed] });
      }
    } catch (e) {
      console.log(e);
    }
  },
};
