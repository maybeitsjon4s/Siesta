export default {
  name: 'raw',
  exec (client, packet) {
    client.music?.handleVoiceUpdate(packet)?.catch(() => {});
  }
};
