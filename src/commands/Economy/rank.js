const { Embed } = require('discord.js');
const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
  name: 'rank',
  aliases: ['topmoney', 'ldb', 'leaderboard'],
  cooldown: 20,
  ownerOnly: false,
  run: async (client, message, args, player, lang) => {

    const COINS = await require("mongoose")
      .connection.collection("users")
      .find({ money: { $gt: 0 } })
      .toArray();

    const coins = Object.entries(COINS)
      .map(([, x]) => x._id)
      .sort((x, f) => x.money - f.money);

    const members = [];

    await PUSH(coins, members);

    const coinsMap = members
      .map((x) => x)
      .sort((x, f) => f.money - x.money)
      .slice(0, 10);

      const mapa = coinsMap.map((x, f) =>`**[ ${f + 1} ] - \`${x.user.tag}\` › ${client.utils.abbreviateNumber(x.money)} ${Emojis.dima}**`)
    
    const embed = new Embed()
      .setTitle(`${Emojis.dima} | __Siesta__`)
      .setDescription(mapa.join('\n'))
      .setColor(client.color)
      .setTimestamp()
    message.reply({ embeds: [embed] });

    async function PUSH(coins, members) {
    for (const member of coins) {
      const doc = await client.db.user.findOne({ _id: member });

      members.push({
        user: await client.users.fetch(member).then((user) => {
          return user;
        }),
        money: doc.money
      });
    }
  }

  },
};
