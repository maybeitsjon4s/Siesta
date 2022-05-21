import Day from 'dayjs';

export default { 
  name: 'guildCreate',
  async exec (client, guild) {
    client.utils.sendLogs({
      type: 'guild',
      content: `\`---\`\nData: **${Day(Date.now()).format('DD/MM/YYYY HH:mm:ss')}**\nFui adicionada no servidor: **${guild.name}** (\`${guild.id}\`)\nMembros: **${guild.memberCount}**\nOwner: **${await guild.fetchOwner().then((member) => memberr.user.tag)}** (\`${guild.ownerId}\`)\n\`---\``
    });
  }
};
