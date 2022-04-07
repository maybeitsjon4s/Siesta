module.exports = (client, packet) => {
  client.music?.handleVoiceUpdate(packet)?.catch(() => {});
};
