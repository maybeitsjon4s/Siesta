export default (client, packet) => {
  client.music.handleVoiceUpdate(packet);
};
