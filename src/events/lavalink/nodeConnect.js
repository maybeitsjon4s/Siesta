module.exports = async (client, node) => {
  console.log(`[LAVALINK] Node ${node.options.id} Conectado!`.red)
        for (const player of [...client.music.players.values()].filter(p => p.node === node).values()) {
        const position = player.position;
        player.connect();
        player.play({ startTime: position });
      }

      setInterval(() => {
        node.send({
          op: 'pong'
        })
      }, 45000);
};
