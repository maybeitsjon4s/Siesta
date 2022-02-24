import { promisify } from "util"
const delay = promisify(setTimeout)

export default async(client) => {
  console.log(`[ SHARDS ] › Shard ${client.shard.ids} conectada!`.green)
  await delay(5000)
  client.music.start(client.user.id);
  client.user.setActivity(`<help - ${await client.shard.fetchClientValues("guilds.cache.size").then((x) => x.reduce((f, y) => f + y))} Guilds | [${client.shard.ids}]`, {
    type: 'LISTENING',
  })
};
