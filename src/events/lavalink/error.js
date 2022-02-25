const Emojis = require(`../../Structures/Utils/emojis`);
module.exports = async (client, node, error) => {
  console.log(`[LAVALINK] Erro em ${node.identifier}`, error.message);
  if (error.message.startsWith('Unable to connect after')) node.connect().catch(() => {});
};
