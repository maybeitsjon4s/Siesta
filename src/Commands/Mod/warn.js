import { EmbedBuilder } from 'discord.js';

export default {
  name: 'warn',
  aliases: ['adv', 'warning'],
  ownerOnly: false,
  playerOnly: false,
  sameChannel: false,
  async exec({ client, message, args, t }) {

    if (!message.member.permissions.has('ManageRoles')) return message.reply(`**${client.emotes.errado} › ${t('commands:warn.noPermission')}**`);

    const member = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(() => { });
    const reason = args.slice(1).join(' ');


    if (!member) return message.reply(`**${client.emotes.errado} › ${t('commands:warn.invalidUser')}**`);

    if (member.id === message.author.id) return message.reply(`**${client.emotes.errado} › ${t('commands:warn.warnYourSelf')}**`);

    if (member.id === client.user.id) return message.reply(`**${client.emotes.errado} › ${t('commands.warn.warnMe')}**`);

    if (message.member.roles.highest.position <= member.roles.highest.position) return message.reply(`**${client.emotes.errado} › ${t('commands:warn.higherRole')}**`);

    if (reason.length > 50) return message.reply(`**${client.emotes.errado} › ${t('commands:warn.bigReason')}**`);

    const doc = await client.db.guild.findOne({ _id: message.guild.id });
    const warnsList = doc.warns;
    if (!warnsList[member.id]) warnsList[member.id] = [];

    warnsList[member.id].push(`**<t:${~~(Date.now() / 1000)}:R> ›** ${t('commands:warn.reason')}: \`${reason ? reason.replace('`', '"') : t('commands:warn.noReason')}\` **| ${message.author.tag}**`);

    await client.db.guild.findOneAndUpdate({ _id: message.guild.id }, {
      $set: { warns: warnsList }
    });

    console.log((await client.db.guild.findOne({ _id: message.guild.id })));
    const embed = new EmbedBuilder()
      .setTitle(`${client.emotes.ban} • __Siesta__`)
      .addField(`${client.emotes.user} User`, `\`${member.user.tag} (${member.id})\``)
      .addField(`${client.emotes.config} ${t('commands:warn.author')}`, `\`${message.author.tag} (${message.member.id})\``)
      .addField(`${client.emotes.star} ${t('commands:warn.reason')}`, `\`${reason || t('commands:warn.noReason')}\``)
      .setTimestamp()
      .setColor(client.color);

    message.reply({
      embeds: [embed]
    });
  }
};
