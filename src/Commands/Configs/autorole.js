const Emojis = require('../../Structures/Utils/emojis.js');

module.exports = {
  name: 'autorole',
  aliases: [],
  playerOnly: false,
  sameChannel: false,
  ownerOnly: false,
  async exec({ client, message, args, lang }) {

    if(!message.member.permissions.has('MANAGE_GUILD') && !client.owners.some(id => id === message.author.id)) return message.reply(`**${Emojis.errado} › ${lang.commands.autorole.errorPerm}**`);
    if(!args[0] || !['status', 'role'].includes(args[0]) || args[0] == 'help') return message.reply({ embeds: [{
      color: client.color,
      title: Emojis.config + '__Siesta__',
      fields: [lang.commands.autorole.embed[0], lang.commands.autorole.embed[1]]
    }]});

    const doc = await client.db.guild.findOne({ _id: message.guild.id });

    if(args[0] == 'status') {
      if(!doc.autorole.status) {
        message.reply(`**${Emojis.config} › ${lang.commands.autorole.enabled}**`);
        doc.autorole.status = true;
        await doc.save();
      } else {
        message.reply(`**${Emojis.config} › ${lang.commands.autorole.disabled}**`);
        doc.autorole.status = false;
        await doc.save();
      }
    } else if(args[0] == 'role') {
      const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
      if(!role) return message.reply(`${Emojis.errado}** › ${lang.commands.autorole.invalidRole}**`);

      if(!doc.autorole.roles.includes(role.id)) {
        if(doc.autorole.roles.length == 5) return message.reply(`**${Emojis.errado} › ${lang.commands.autorole.maxRoles}**`);
        message.reply(`**${Emojis.config} › ${lang.commands.autorole.added}**`);
        doc.autorole.roles.push(role.id);
        await doc.save();
      } else {
        const position = doc.autorole.roles.indexOf(role.id);
        doc.autorole.roles.splice(position, 1);
        await doc.save();
        message.reply(`**${Emojis.config} › ${lang.commands.autorole.removed}**`);
      }
    }
  }
};
