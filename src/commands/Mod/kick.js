const { MessageEmbed, Discord } = require(`discord.js`);

const Emojis = require(`../../Structures/Utils/emojis`);
 const Guild = require("../../database/Schemas/Guild")

module.exports = {
  name: `kick`,
  category: `mod`,
  aliases: [`expulsar`, `kick`],
  run: async (client, message, args, player, lang) => {

        if (!message.member.permissions.has([`KICK_MEMBERS`])) return message.reply(`**${Emojis.errado} » ${lang.commands.kick.userPermission}**`);

        if (!message.guild.me.permissions.has([`KICK_MEMBERS`])) return message.reply(`**${Emojis.errado} » ${lang.commands.kick.myPermission}**`);

        if (!args[0]) return message.reply(`**${Emojis.errado} » ${lang.commands.kick.noMention}!**`);

        let member;
        try {
          member =
            message.mentions.members.first() ||
            (await message.guild.members.fetch(args[0]));
        } catch {
          return message.reply(`**${Emojis.errado} » ${lang.commands.kick.notFound}!**`);
        }

        if (message.member.roles.highest.position <= member.roles.highest.position)return message.reply(`**${Emojis.errado} » ${lang.commands.kick.higherRole}!**`);

        if (member.roles.highest.position >= message.guild.me.roles.highest.position) return message.reply(`**${Emojis.errado} » ${lang.commands.kick.higherRoleThanMine}!**`);

        let motivo = args.slice(1).join(' ') || lang.commands.kick.noReason

        message.guild.members.kick(member.id, motivo);

        const kick = new MessageEmbed()
          .setTitle(`${Emojis.ban} | __Siesta__`)
          .addField(`${Emojis.user} ${lang.commands.kick.user}`, `\`${member.user.tag}\``)
          .addField(`${Emojis.info} ${lang.commands.kick.reason}`, `\`${motivo}\``)
          .setColor(client.color)
          .setFooter({
            text: message.author.tag,
            iconURL: message.author.displayAvatarURL({ dynamic: true }),
          })
          .setTimestamp();
        message.reply({ embeds: [kick] });
  }
}
