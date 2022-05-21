export default {
  name: 'prefix',
  aliases: ['setprefix', 'prefixo'],
  playerOnly: false,
  sameChannel: false,
  ownerOnly: false,
  async exec({ client, message, args, t }) { 

    if (!message.member.permissions.has('MANAGE_GUILD') && !client.owners.some(id => id === message.author.id) ) return message.reply(`${client.emj.errado}** › ${t('commands:prefix.errorPerm')}**`);

    if (!args[0]) return message.reply(`${client.emj.errado}** › ${t('commands:prefix.noPrefix')}**`);

    if (args[0].length > 7) return message.reply(`${client.emj.errado}** › ${t('commands:prefix.sevenLenght')}**`);

    await client.db.guild.findOneAndUpdate({
      _id: message.guild.id
    }, {
      $set: {
        prefix: args[0]
      }
    });
    message.reply(`${client.emj.config}** › ${t('commands:prefix.seted')}!**`);
  }
};
