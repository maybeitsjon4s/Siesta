const Emojis = require(`../../../Structures/Utils/emojis`);
const delay = require('util').promisify(setTimeout);
module.exports = async(client) => {
  console.log(`[ SHARDS ] › Shard ${client.shard.ids} reconectando...`.green)
};
