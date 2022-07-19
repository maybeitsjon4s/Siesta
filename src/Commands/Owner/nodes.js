export default {
  name: 'nodes',
  aliases: ['lavalink'],
  ownerOnly: false,
  playerOnly: false,
  sameChannel: false,
  async exec({ client, message }) {

    const map = client.music.nodes.map(node => `Node **${node.options.id}** | Players: **${node.stats.players}**, Tocando:  **${node.stats.playingPlayers}**, Uptime: **${client.utils.formatTime(node.stats.uptime)}**, Estado: **${String(node.state).replace('0', 'Conectando').replace('1', 'Conectado').replace('2', 'Disconectado')}**, Host: **${node.options.hostedIn}**`);
    message.reply({
      content: String(map.join('\n'))
    });
  },
};