const Emojis = require(`../../Structures/Utils/emojis`);

module.exports = {
  name: `ping`,
  aliases: ["latency", "latencia", "pong", "🏓"],
  run: async (client, message, args, player, lang) => {
    try {

      let pingStart = process.hrtime();
      await client.db.guild.findOne({ _id: message.guild.id, })
      let pingStop = process.hrtime(pingStart);
      let pingDb = Math.round((pingStop[0] * 1e9 + pingStop[1]) / 1e6);

      message.reply({
        content: `**🏓Pong!\n💻Api » __${client.ws.ping}__ms\n${Emojis.db}Database » __${pingDb}__ms \n⚡Ping Shard » __${message.guild.shard.ping}__ms\n📡Shards » __${message.guild.shard.id + 1}/${client.shard.count}__**`,
      });
    } catch (e) {
      console.log(e);
    }
  },
};
