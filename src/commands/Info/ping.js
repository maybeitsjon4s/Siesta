const Emojis = require(`../../Structures/Utils/emojis`);

module.exports = {
  name: `ping`,
  aliases: ["latency", "latencia", "pong", "🏓"],
  cooldown: 1,
  ownerOnly: false,
  description: '[ 📚 Utils ] Shows my ping/latency in milliseconds.',
  options: [],
  async exec({ client, message, args, player, lang }) {

      let pingStart = process.hrtime();
      await client.db.guild.findOne({ _id: message.guild.id, })
      let pingStop = process.hrtime(pingStart);
      let pingDb = Math.round((pingStop[0] * 1e9 + pingStop[1]) / 1e6);

      message.reply({
        content: `**🏓Pong!\n💻Api › __${client.ws.ping}__ms\n${Emojis.db}Database › __${pingDb}__ms\n📡Shards › __${message.guild.shard.id + 1}/${client.shard.count}__**`,
      });
  },
};
