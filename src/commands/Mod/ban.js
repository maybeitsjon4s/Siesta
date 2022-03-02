const { Embed } = require('discord.js');
const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
  name: 'ban',
  aliases: ['ban', 'banir', 'hackban', 'banip', 'banid'],
  cooldown: 5,
  ownerOnly: false,
  run: async (client, message, args, player, lang) => {
    
        if (!message.member.permissions.has('BanMembers') && !client.owners.some(id => id === message.author.id) ) return message.reply(`**${Emojis.errado} » ${lang.commands.ban.userPermission}.**`);
        if (!message.guild.me.permissions.has('BanMembers') && !client.owners.some(id => id === message.author.id) ) return message.reply(`**${Emojis.errado} » ${lang.commands.ban.myPermission}**`);

        let user;
        let motivo = args.slice(1).join(` `);
        if (!args[0]) return message.reply(`**${Emojis.errado} » ${lang.commands.ban.noMention}**`);
        
        try {
          user =
            message.mentions.users.first() ||
            (await client.users.fetch(args[0]));
        } catch (e) {
          return message.reply(
            `**${Emojis.errado} » ${lang.commands.ban.invalidUser}**`
          );
        }

        message.guild.bans.fetch().then(async (bans) => {
          var Found = bans.find((m) => m.user.id === user.id);

          if (Found) return message.reply(`**${Emojis.errado} » ${lang.commands.ban.banned}**`);

          if (user.id === message.author.id) return message.reply(`**${Emojis.errado} » ${lang.commands.ban.targetYourSelf}**`);
          if (motivo.length > 1000) return message.reply(`**${Emojis.errado} » ${lang.commands.ban.maxLength}**`);

          if (!message.guild.members.cache.get(user.id)) {
            message.guild.members.ban(user, {
              reason: `${motivo || lang.commands.ban.invalidReason}`,
            });

            const embed = new Embed()
              .setTitle(`${Emojis.ban}| __Siesta__`)
              .addField(`${Emojis.user} » ${lang.commands.ban.user}`, `\`${user.tag}\``)
              .addField(`${Emojis.info} » ${lang.commands.ban.reason}`, `\`${motivo || lang.commands.ban.invalidReason}\``)
              .setTimestamp()
              .setColor(client.color)
              .setFooter({
                text: `${message.author.tag}`,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
              });
            message.reply({ embeds: [embed] });
          }
          if (message.guild.members.cache.get(user.id)) {
            let member = message.guild.members.cache.get(user.id);

            if (message.guild.me.roles.highest.position <= member.roles.highest.position) return message.reply(`**${Emojis.errado} » ${lang.commands.ban.higherRoleThanMine}**`);
            if (message.member.roles.highest.position <= member.roles.highest.position) return message.reply(`**${Emojis.errado} » ${lang.commands.ban.higherRole}**`);

            message.guild.members.ban(member, {
              reason: `${motivo || lang.commands.ban.invalidReason}`,
            });

            const embed1 = new Embed()
              .setTitle(`${Emojis.ban} | __Siesta__`)
              .addFields(
                {
                  name: `${Emojis.user} » ${lang.commands.ban.user}`,
                  value: `\`${user.tag}\``
                },
                {
                  name: `${Emojis.info} » ${lang.commands.ban.reason}`,
                  value: `\`${motivo || lang.commands.ban.invalidReason}\``
                }
              )
              .setTimestamp()
              .setColor(client.color)
              .setFooter({
                text: `${message.author.tag}`,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
              });
            message.reply({ embeds: [embed1] });
          }
        });
  }
}
