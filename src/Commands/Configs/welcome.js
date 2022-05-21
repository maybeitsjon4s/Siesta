export default {
  name: 'welcome',
  aliases: ['bem-vindo', 'entrada'],
  ownerOnly: false,
  playerOnly: false,
  sameChannel: false,
  async exec({ client, message, args, t }) {
    
    if (!message.member.permissions.has('MANAGE_GUILD') && !client.owners.includes(message.author.id)) return message.reply({
      content: `**${client.emj.errado} › ${t('commands:welcome.errorPerm')}**`});

    const doc = await client.db.guild.findOne({ _id: message.guild.id });

    const errorMessage = {embeds: [{
      title: `${client.emj.config} • Siesta`,
      description: t('commands:welcome.argsError', {
        prefix: doc.prefix
      }),
      color: client.color
    }]};
    const sucessMessage = {
      content: t('commands:welcome.seted')
    };

    if (!args[0] || !['channel', 'status', 'message'].includes(args[0])) return message.reply(errorMessage);

    if(args[0] === 'channel') {
      const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
      if(!channel) return message.reply(errorMessage);
      doc.welcome.channel = channel.id;
      await doc.save();
      message.reply(sucessMessage);
    } else if(args[0] === 'status') {
      const newStatus = !doc.welcome.status;
      doc.welcome.status = newStatus;
      await doc.save();
      message.reply(sucessMessage);
    } else if(args[0] === 'message') {
      const msg = args.slice(1).join(' ');
      if(!msg) return message.reply(errorMessage);
      doc.welcome.message = msg;
      await doc.save();
      message.reply(sucessMessage);
    }
  }
};
