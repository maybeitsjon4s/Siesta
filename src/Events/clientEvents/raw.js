module.exports = {
  name: 'raw',
  exec (client, packet) {
    client.music?.handleVoiceUpdate(packet)?.catch(() => {});
  }
};
