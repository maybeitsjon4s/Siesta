const Emojis = require(`../../../Structures/Utils/emojis`);
module.exports = (client, packet) => {
  client.music.handleVoiceUpdate(packet);
};
