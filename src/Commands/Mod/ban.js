const { MessageEmbed } = require('discord.js-light');
const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
  name: 'ban',
  aliases: ['ban', 'banir', 'hackban', 'banip', 'banid'],
  ownerOnly: false,
  playerOnly: false,
  sameChannel: false,
  description: '[ 🔨 Moderation ] Bans some one from the server',
  options: [{
    name: 'user',
    description: 'The user you wanna ban',
    type: 'STRING',
    required: true
  },
  {
    name: 'reason',
    description: 'The reason the user will get banned',
    type: 'STRING',
    required: false
  }],
  async exec({ client, message, args, t }) {
    
    if (!message.member.permissions.has('BAN_MEMBERS') && !client.owners.some(id => id === message.author.id) ) return message.reply(`**${Emojis.errado} › ${t('commands:ban.userPermission')}.**`);
    if (!message.guild.me.permissions.has('BAN_MEMBERS') && !client.owners.some(id => id === message.author.id) ) return message.reply(`**${Emojis.errado} › ${t('commands:ban.myPermission')}**`);

    const motivo = args.slice(1).join(' ');
    if (!args[0]) return message.reply(`**${Emojis.errado} › ${t('commands:ban.noMention')}**`);
       
    const user = await client.utils.getUser(args[0]);

    if(!user) return message.reply(`**${Emojis.errado} › ${t('commands:ban.invalidUser')}**`);

    message.guild.bans.fetch().then(async (bans) => {
      const Found = bans.find((m) => m.user.id === user.id);

      if (Found) return message.reply(`**${Emojis.errado} › ${t('commands:ban.banned')}**`);

      if (user.id === message.author.id) return message.reply(`**${Emojis.errado} › ${t('commands:ban.targetYourSelf')}**`);
      if (motivo.length >= 1000) return message.reply(`**${Emojis.errado} › ${t('commands:ban.maxLength')}**`);

      if (!message.guild.members.cache.get(user.id)) {
        message.guild.members.ban(user, {
          reason: `${motivo || t('commands:ban.invalidReason')}`,
        });

        const embed = new MessageEmbed()
          .setTitle(`${Emojis.ban}| __Siesta__`)
          .addField(`${Emojis.user} › ${t('commands:ban.user')}`, `\`${user.tag}\``)
          .addField(`${Emojis.info} › ${t('commands:ban.reason')}`, `\`${motivo || t('commands:ban.invalidReason')}\``)
          .setTimestamp()
          .setColor(client.color)
          .setFooter({
            text: `${message.author.tag}`,
            iconURL: message.author.displayAvatarURL({ dynamic: true })
          });
        message.reply({ embeds: [embed] });
      }
      if (message.guild.members.cache.get(user.id)) {
        const member = message.guild.members.cache.get(user.id);

        if (message.guild.me.roles.highest.position <= member.roles.highest.position) return message.reply(`**${Emojis.errado} › ${t('commands:ban.higherRoleThanMine')}**`);
        if (message.member.roles.highest.position <= member.roles.highest.position) return message.reply(`**${Emojis.errado} › ${t('commands:ban.higherRole')}**`);

        message.guild.members.ban(member, {
          reason: `${motivo || t('commands.ban.invalidReason')}`,
        });

        const embed1 = new MessageEmbed()
          .setTitle(`${Emojis.ban} | __Siesta__`)
          .addFields(
            {
              name: `${Emojis.user} › ${t('commands:ban.user')}`,
              value: `\`${user.tag}\``
            },
            {
              name: `${Emojis.info} › ${t('commands:ban.reason')}`,
              value: `\`${motivo || t('commands:ban.invalidReason')}\``
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
};
