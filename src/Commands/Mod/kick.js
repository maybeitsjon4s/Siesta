import { EmbedBuilder, ApplicationCommandOptionType } from 'discord.js';

export default {
  name: 'kick',
  aliases: ['expulsar'],
  ownerOnly: false,
  playerOnly: false,
  sameChannel: false,
  description: '[ 🔨 Moderation ] Kicks someone fromt the server',
  options: [{
    name: 'user',
    description: 'The user you wanna kick',
    type: ApplicationCommandOptionType.String,
    required: true
  },
  {
    name: 'reason',
    description: 'The reason for the member be kicked',
    type: ApplicationCommandOptionType.String,
    required: false
  }],
  async exec({ client, message, args, t }) {

    if (!message.member.permissions.has('KickMembers') && !client.owners.some(id => id === message.author.id)) return message.reply(`**${client.emotes.errado} › ${t('commands:kick.userPermission')}**`);

    if (!message.guild.members.me.permissions.has('KickMembers')) return message.reply(`**${client.emotes.errado} › ${t('commands:kick.myPermission')}**`);

    if (!args[0]) return message.reply(`**${client.emotes.errado} › ${t('commands:kick.noMention')}!**`);

    let member;
    try {
      member = message.mentions.members.first() || await message.guild.members.fetch(args[0]);
    } catch {
      return message.reply(`**${client.emotes.errado} › ${t.commands.kick.notFound}!**`);
    }

    if (message.member.roles.highest.position <= member.roles.highest.position) return message.reply(`**${client.emotes.errado} › ${t('commands:kick.higherRole')}!**`);

    if (member.roles.highest.position >= message.guild.members.me.roles.highest.position) return message.reply(`**${client.emotes.errado} › ${t('commands:kick.higherRoleThanMine')}!**`);

    const motivo = args.slice(1).join(' ') || t('commands:kick.noReason');

    message.guild.members.kick(member.id, `By: ${message.author.tag} -- ${motivo}`);

    const kick = new EmbedBuilder()
      .setTitle(`${client.emotes.ban} • __Siesta__`)
      .addFields(
        {
          name: `${client.emotes.user} ${t('commands:kick.user')}`,
          value: `\`${member.user.tag}\``,
        },
        {
          name: `${client.emotes.info} ${t('commands:kick.reason')}`,
          value: `\`${motivo}\``
        }
      )
      .setColor(client.color)
      .setFooter({
        text: message.author.tag,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();
    message.reply({ embeds: [kick] });
  }
};
