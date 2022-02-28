const AsciiTable = require("ascii-table");

module.exports = {
  name: 'shards',
  run: async (client, message, args, player, lang) => {

    if(!client.owners.some(x => x === message.author.id)) return;

        
         const table = new AsciiTable(`Shards Information`),
          unit = ["", "K", "M", "G", "T", "P"];
        table.setHeading("SID", "UpTime", "Ping", "Guilds");
        table.setAlign(0, AsciiTable.CENTER);
        table.setAlign(1, AsciiTable.CENTER);
        table.setAlign(2, AsciiTable.CENTER);
        table.setAlign(3, AsciiTable.CENTER);

        table.setBorder("|", "-", "+", "+");

        const uptime = await client.shard.broadcastEval((c) => c.uptime),
          ping = await client.shard.broadcastEval((c) => c.ws.ping),
          guilds = await client.shard.broadcastEval((c) => c.guilds.cache.size);
        for (let i = 0; i < client.shard.count; i++) {
          table.addRow(
            i,
            client.utils.formatTime(
              client.utils.convertMilliseconds(uptime[i])
            ),
            "~" + Math.round(ping[i]) + "ms",
            guilds[i].toLocaleString("pt-BR")
          );
        }
        const botGuilds = guilds.reduce((prev, val) => prev + val),
          pingG = ping.reduce((prev, val) => prev + val),
          media = pingG / client.shard.count;

        table.addRow("______", "______", "______", "______");

        table.addRow(
          "TOTAL",
          "-",
          "~" + Math.round(media) + "ms",
          botGuilds.toLocaleString("pt-BR")
        );

        message.reply(`\`\`\`prolog\n${table.toString()}\`\`\``);

        return table.clearRows();
  }
}
