const Emojis = require(`../../../Structures/Utils/emojis`);
module.exports = async(client) => {
  client.music.start(client.user.id);
  client.user.setActivity(`<play - ${await client.shard.fetchClientValues('guilds.cache.size').then(a => eval(a.join(",").split(",").map(a => Number(a)).join("+")))} Guilds`, {
    type: `LISTENING`,
  })
};
