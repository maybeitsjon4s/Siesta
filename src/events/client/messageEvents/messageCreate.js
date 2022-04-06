const Emojis = require('../../../Structures/Utils/emojis');
const Day = require('dayjs');

module.exports = async (client, message) => {
  if (message.author.bot || !message.guild) return;

  let prefix;

  let USER = await client.db.user.findOne({
    _id: message.author.id,
  });

  let GUILD = await client.db.guild.findOne({
    _id: message.guild.id,
  });

  if (!GUILD) GUILD = await client.db.guild.create({
    _id: message.guild.id,
  });

  const mentionRegex = message.content.match(new RegExp(`^<@!?(${client.user.id})>`, 'gi'));

  if (message.content.match(new RegExp(`^<@!?(${client.user.id})>`, 'gi'))) {
    prefix = String(mentionRegex);
  } else if (message.content.toLowerCase().startsWith('siesta')) {
    prefix = 'siesta';
  } else {
    prefix = GUILD.prefix;
  }

  if(client.user.id == '871825521779036201'/*Siesta Canary*/) prefix = '.';

  if (!message.content.toLowerCase().startsWith(prefix)) return;

  if (!USER) USER = await client.db.user.create({ _id: message.author.id, });

  if(USER?.blacklist) return;

  let lang = GUILD.lang || 0;

  switch(lang) {
  case 1:
    lang = client.langs.pt;
    break;
  case 0:
    lang = client.langs.en;
    break;
  }
  if(!message.channel.permissionsFor(client.user.id).has('READ_MESSAGE_HISTORY')) message.reply = message.channel.send;

  if (message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) return message.reply({ content: String(lang.events.messageCreate.mention).replaceAll('{}', GUILD.prefix) });

  const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

  if (cmd.length === 0) return;
  const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

  if (!command) return;

  const player = client.music.players.get(message.guild.id);
  
  if(command.ownerOnly && !client.owners.some(id => id === message.author.id)) return;
  if(command.playerOnly && !player) return message.reply(`**${Emojis.errado} › ${lang.music.noPlayer}**`);
  if(command.sameChannel) {
    if(!message.member.voice.channel) return message.reply(`**${Emojis.errado} › ${lang.music.channelError}**`);


   if(message.member.voice.channel.id !== message.guild.me.voice.channel?.id) return message.reply(`**${Emojis.errado} › ${lang.music.channelError}**`);
    };

  client.utils.sendLogs(`\`---\`\nData: **${Day(Date.now()).format('DD/MM/YYYY HH:mm:ss')}**\nComando **${command.name}** executado no servidor **${message.guild.name}** (\`${message.guild.id}\`)\nUsuario: **${message.author.tag}** (\`${message.author.id}\`)\n\`---\``);

  await command.exec({ client, message, args, player, lang }).catch((err) => {
    client.logger.error(`Erro no commando ${command.name}`);
    client.logger.stack(err.stack);
    message.reply({ embeds: [{
      color: client.color,
      description: `**${Emojis.rocket} › ` + lang.events.messageCreate.error.replace('{}', command.name) + '**' + '\n\n```' + err + '```'
    }] });
  });
  await client.db.user.findOneAndUpdate({ _id: message.author.id }, { 
    $set: { lastCommandUsed: Date.now() 
    } });  
};
