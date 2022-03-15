const { Collection, MessageButton, MessageActionRow, ButtonStyle } = require('discord.js-light');
const Emojis = require('../../../Structures/Utils/emojis')
const moment = require('moment');

module.exports = async (client, message) => {
const { cooldowns } = client;
  if (message.author.bot || !message.guild) return;

  let prefix;

  let USER = await client.db.user.findOne({
    _id: message.author.id,
  })

  let GUILD = await client.db.guild.findOne({
    _id: message.guild.id,
  })

  if (!GUILD) GUILD = await client.db.guild.create({
    _id: message.guild.id,
  })

  const mentionRegex = message.content.match(new RegExp(`^<@!?(${client.user.id})>`, `gi`));

  if (message.content.match(new RegExp(`^<@!?(${client.user.id})>`, 'gi'))) {
    prefix = String(mentionRegex)
  } else if (message.content.toLowerCase().startsWith("siesta")) {
    prefix = 'siesta'
  } else {
    prefix = GUILD.prefix
  }

  if (!message.content.toLowerCase().startsWith(prefix)) return;

  if (!USER) await client.db.user.create({ _id: message.author.id, })

  if(USER?.blacklist) return;

  let lang = GUILD.lang || 0

  switch(lang) {
    case 1:
    lang = client.langs.pt
    break;
    case 0:
    lang = client.langs.en
    break;
  }

  if (message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) return message.reply({ content: String(lang.events.messageCreate.mention).replaceAll('{}', GUILD.prefix) })

  const args = message.content.slice(prefix.length).trim().split(/ +/g);

  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;
  const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

  if (!command) return;

  if (!cooldowns.has(command)) cooldowns.set(command, new Collection());
  
  const { now } = Date;
  const timestamps = cooldowns.get(command);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now() < expirationTime) {
      const timeLeft = (expirationTime - now()) / 1000;
      return message.reply({ content: `**${Emojis.rocket} › `+ String(lang.events.messageCreate.cooldown).replace('{}', timeLeft.toFixed(1)) + '**'})
    }
  }
  timestamps.set(message.author.id, now());

  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  const player = client.music.players.get(message.guild.id);
  
  if(command.ownerOnly && !client.owners.some(id => id === message.author.id)) return;

    client.utils.sendLogs(`\`---\`\nData: **${moment(Date.now()).format('L LT')}**\nComando **${command.name}** executado no servidor **${message.guild.name}** (\`${message.guild.id}\`)\nUsuario: **${message.author.tag}** (\`${message.author.id}\`)\n\`---\``)

    try {
      await command.run(client, message, args, player, lang);
    } catch (e) {
      console.log(String(e.stack).gray)
      const row = new MessageActionRow().addComponents(
        new MessageButton()
        .setEmoji({
          name: 'lua',
          id: '948650383562125313',
          animated: true
        })
        .setStyle('LINK')
        .setURL(`https://discord.com/invite/vYEutrG7gY`)
      );
      message.reply({ embeds: [{
      color: client.color,
      description: `**${Emojis.rocket} › ` + lang.events.messageCreate.error.replace('{}', command.name) + '**' + '\n\`' + e + '\`'
      }],
      components: [row]})
    } finally {
      await client.db.user.findOneAndUpdate({ _id: message.author.id }, { $set: { lastCommandUsed: Date.now() }})
    }
  
};
