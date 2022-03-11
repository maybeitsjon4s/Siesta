
module.exports = {
  name: 'nodes',
  aliases: ['lavalink'],
  cooldown: 3,
  ownerOnly: true,
  run: async (client, message, args, player, lang) => {

    const map = client.music.nodes.map(node => `[ Node ${node.options.id} ] Players: ${node.stats.players}  ${node.stats.playingPlayers} Uptime: ${client.utils.formatTime(node.stats.uptime)}, State: ${String(node.state).replace('0', 'CONNECTING').replace('1', 'CONNECTED').replace('2', 'DISCONNECTED')}`)
    message.reply({ content: `\`\`\`\n${map.join('\n')}\n\`\`\`` });
  },
};
