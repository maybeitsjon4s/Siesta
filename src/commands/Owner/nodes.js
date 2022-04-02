
module.exports = {
  name: 'nodes',
  aliases: ['lavalink'],
  cooldown: 3,
  ownerOnly: true,
  async exec({ client, message }) {

    const map = client.music.nodes.map(node => `[ ${node.options.id} ] Players: ${node.stats.players}, Tocando:  ${node.stats.playingPlayers} Uptime: ${client.utils.formatTime(node.stats.uptime)}, Estado: ${String(node.state).replace('0', 'Conectando').replace('1', 'Conectado').replace('2', 'Disconectado')}`);
    message.reply({ content: `\`\`\`\n${map.join('\n')}\n\`\`\`` });
  },
};
