module.exports = async (client, node) => {
        for (const player of [...client.music.players.values()].filter(p => p.node === node).values()) {
        const position = player.position;
        player.connect();
        player.play({ startTime: position });
      }
};
