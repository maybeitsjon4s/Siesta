
module.exports = {
  name: 'nodes',
  aliases: ['lavalink'],
  run: async (client, message, args, player, lang) => {
    if(!client.owners.some(x => x == message.author.id)) return;

    const map = client.music.nodes.map(node => `[ Node ${node.options.id}] Players: ${node.stats.players} | ${node.stats.playingPlayers} Uptime: ${client.utils.formatTime(node.stats.uptime)}, State: ${String(node.state).replace('0', 'CONNECTING').replace('1', 'CONNECTED').replace('2', 'DISCONNECTED')}`)
    message.reply({ content: `\`\`\`\n${map.join('\n')}\n\`\`\`` });
  },
};
