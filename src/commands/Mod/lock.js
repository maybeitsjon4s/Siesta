const Emojis = require(`../../Structures/Utils/emojis`);

module.exports = {
  name: 'lock',
  aliases: ['trancar'],
  run: async (client, message, args, player, lang) => {
    
        if (!message.member.permissions.has([`MANAGE_CHANNELS`]))
          return message.reply(
            `**${Emojis.errado} » ${lang.commands.lock.userPermission}**`
          );

        if (!message.guild.me.permissions.has([`MANAGE_CHANNELS`]))
          return message.reply(
            `**${Emojis.errado} » ${lang.commands.lock.myPermission}**`
          );

        message.channel.permissionOverwrites.edit(message.guild.id, {
          SEND_MESSAGES: false,
        });
        message.reply(`**${Emojis.ban} » ${lang.commands.lock.sucess}**`);
       }
  }
