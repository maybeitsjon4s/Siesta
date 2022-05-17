import { MessageEmbed } from 'discord.js';

export default {
  name: 'warn',
  aliases: ['adv', 'warning'],
  ownerOnly: false,
  playerOnly: false,
  sameChannel: false,
  async exec({ client, message, args, t }) {

    if(!message.member.permissions.has('MANAGE_ROLES')) return message.reply(`**${client.Emojis.errado} › ${t('commands:warn.noPermission')}**`);

    const member = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(() => {});
    const reason = args.slice(1).join(' ');


    if(!member) return message.reply(`**${client.Emojis.errado} › ${t('commands:warn.invalidUser')}**`);

    if(member.id === message.author.id) return message.reply(`**${client.Emojis.errado} › ${t('commands:warn.warnYourSelf')}**`);

    if(member.id === client.user.id) return message.reply(`**${client.Emojis.errado} › ${t('commands.warn.warnMe')}**`);

    if(message.member.roles.highest.position <= member.roles.highest.position) return message.reply(`**${client.Emojis.errado} › ${t('commands:warn.higherRole')}**`);

    if(reason.length > 50) return message.reply(`**${client.Emojis.errado} › ${t('commands:warn.bigReason')}**`);

    const doc = await client.db.guild.findOne({ _id: message.guild.id });
    const warnsList = doc.warns;
    if(!warnsList[member.id]) warnsList[member.id] = [];

    warnsList[member.id].push(`**<t:${~~(Date.now() / 1000)}:R> ›** ${t('commands:warn.reason')}: \`${reason ? reason.replace('`', '"') : t('commands:warn.noReason')}\` **| ${message.author.tag}**`);

    await client.db.guild.findOneAndUpdate({ _id: message.guild.id }, {
      $set: { warns: warnsList }
    });

    console.log((await client.db.guild.findOne({ _id: message.guild.id })));
    const embed = new MessageEmbed()
      .setTitle(`${client.Emojis.ban} • __Siesta__`)
      .addField(`${client.Emojis.user} User`, `\`${member.user.tag} (${member.id})\``)
      .addField(`${client.Emojis.config} ${t('commands:warn.author')}`, `\`${message.author.tag} (${message.member.id})\``)
      .addField(`${client.Emojis.star} ${t('commands:warn.reason')}`, `\`${reason || t('commands:warn.noReason')}\``)    
      .setTimestamp()
      .setColor(client.color);

    message.reply({
      embeds: [embed]
    });
  }
};
