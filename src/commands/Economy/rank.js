const { MessageEmbed } = require('discord.js-light');
const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
  name: 'rank',
  aliases: ['topmoney', 'ldb', 'leaderboard'],
  cooldown: 20,
  ownerOnly: false,
  run: async (client, message, args, player, lang) => {

    const diamonds = await require("mongoose")
      .connection.collection("users")
      .find({ money: { $gt: 0 } })
      .toArray();

    let array = []
    diamonds.map(x => {
      array.push({
      user: x._id,
      money: x.money
      })
    })

    array = array.sort((a, b) => a.money - b.money).reverse().slice(0, 10);

      const mapa = await Promise.all(array.map(async (u, i) => {
     return `**[ ${i + 1} ] - \`${(await client.users.fetch(u.user)).tag}\` › ${client.utils.abbreviateNumber(u.money)} ${Emojis.dima}**`
      }))
    
    const embed = new MessageEmbed()
      .setTitle(`${Emojis.dima} | __Siesta__`)
      .setDescription(mapa.join('\n'))
      .setColor(client.color)
      .setTimestamp()
    message.reply({ embeds: [embed] });
    
  },
};
