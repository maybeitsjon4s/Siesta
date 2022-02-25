const { MessageEmbed, Discord } = require(`discord.js`);
const AsciiTable = require(`ascii-table`);
const Emojis = require(`../../Structures/Utils/emojis`);
 const Guild = require("../../database/Schemas/Guild")

module.exports = {
  name: `nodes`,
  aliases: ["lavalink"],
  run: async (client, message, args, player, lang) => {
    let table = new AsciiTable(`Siesta Lavalink Nodes`);
    table.setHeading(`Name`, `Players`, `PlayingPlayers`, `Uptime`, 'Status');
    client.music.nodes.map((x) =>
      table.addRow(
        x.options.id,
        x.stats.players,
        x.stats.playingPlayers,
        client.utils.formatTime(
          client.utils.convertMilliseconds(x.stats.uptime)
        ),
        String(x.state).replace('0', 'CONNECTING').replace('1', 'CONNECTED').replace('2', 'DISCONNECTED')
      )
    );
    message.reply({ content: `\`\`\`\n${table.toString()}\n\`\`\`` });
  },
};
