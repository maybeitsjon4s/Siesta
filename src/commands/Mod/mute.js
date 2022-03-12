const { Embed } = require('discord.js');
const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
  name: 'mute',
  aliases: ['silenciar', 'mutar'],
  cooldown: 6,
  ownerOnly: false,
  run: async (client, message, args, player, lang) => {
    
        if (!message.member.permissions.has('ModerateMembers') && !client.owners.some(id => id === message.author.id)) return message.reply(`**${Emojis.errado} › ${lang.commands.mute.userPermision}!**`);

        if (!message.guild.me.permissions.has('ModerateMembers')) return message.reply(`**${Emojis.errado} › Eu ${lang.commands.mute.myPermission}!**`);

        if (!args[0]) return message.reply(`**${Emojis.errado} › ${lang.commands.mute.noArgs}!**`);

        let member;
        try {
          member = message.mentions.members.first() ||(await message.guild.members.fetch(args[0]));
        } catch {
          return message.reply(`**${Emojis.errado} › ${lang.commands.mute.notFound}!**`);
        }

        let time = args[1];

        let reason = args.slice(2).join(' ') || 'INVALID';

        if (!time) return message.reply(`**${Emojis.errado} › ${lang.commands.mute.noTime}!**`);

        if (member.id === message.author.id) return message.reply(`**${Emojis.errado} › ${lang.commands.mute.muteYourSelf}!**`);

        if (member.id === client.id) return message.reply(`**${Emojis.errado} › ${lang.commands.mute.punishMe}!**`);

        if (message.member.roles.highest.position <= member.roles.highest.position) return message.reply(`**${Emojis.errado} › ${lang.commands.mute.higherRole}!**`);

        if (member.roles.highest.position >= message.guild.me.roles.highest.position) return message.reply(`**${Emojis.errado} › ${lang.commands.mute.higherRoleThanMine}!**`);

        if (!client.utils.timeToMilliseconds(time))return message.reply(`**${Emojis.errado} › ${lang.commands.mute.invalidTime}**`);

        let tempo = client.utils.timeToMilliseconds(time);
        if (tempo >= 2419200000) return message.reply(`**${Emojis.errado} › ${lang.commands.mute.higherThan28days}!**`);

        let embed1 = new Embed()
          .setColor(client.color)
          .setFooter({
            text: message.author.tag,
            iconURL: message.author.displayAvatarURL({ dynamic: true }),
          })
          .setTitle(`${Emojis.ban} | __Siesta__`)
          .addFields(
            {
              name: `${Emojis.user} › ${lang.commands.mute.user}: `,
              value: `\`${member.user.tag}\``,
            },
            {
              name: `${Emojis.info} › ${lang.commands.mute.reason}:`,
              value: `\`${reason}\``
            },
            {
              name: `${Emojis.rocket} › ${lang.commands.mute.during}:`,
              value: `\`${client.utils.formatTime(client.utils.convertMilliseconds(tempo))}\``
            }
          )
          .setTimestamp();
        message.reply({ embeds: [embed1] });
        member.timeout(tempo, reason);
      }
}
