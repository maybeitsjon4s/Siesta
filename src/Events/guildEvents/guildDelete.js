import Day from 'dayjs';

export default {
  name: 'guildDelete',
  async exec (client, guild) {
    client.utils.sendLogs({
      type: 'guild',
      content: `\`---\`Data: **${Day(Date.now()).format('DD/MM/YYYY HH:mm:ss')}**\nFui removida do servidor: **${guild.name}** (\`${guild.id}\`)\nDono: **${(await guild.fetchOwner()).user.tag}** (\`${(await guild.fetchOwner()).user.id}\`)\n\`---\``
    });
    await client.db.guild.findOneAndDelete({ _id: guild.id }).catch(() => {});
  }
};
