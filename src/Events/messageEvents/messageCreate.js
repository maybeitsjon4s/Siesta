import Day from 'dayjs';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import i18next from 'i18next';

export default {
  name: 'messageCreate',
  async exec(client, message) {
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

    if (client.user.id == '897914623796338740') prefix = '.';

    if (!message.content.toLowerCase().startsWith(prefix)) return;

    if (!USER) USER = await client.db.user.create({ _id: message.author.id, });

    if (USER?.blacklist) return;

    let t = GUILD.lang || 0;

    switch (t) {
    case 1:
      t = i18next.getFixedT('pt-BR');
      break;
    case 0:
      t = i18next.getFixedT('en-US');
      break;
    }

    if (!message.channel.permissionsFor(client.user.id).has('ReadMessageHistory')) message.reply = message.channel.send;

    if (message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) return message.reply({
      content: t('events:messageCreate.mention', {
        prefix: GUILD.prefix
      })
    });

    const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

    if (cmd.length === 0) return;
    const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

    if (!command) return;

    const player = client.music.players.get(message.guild.id);

    if (command.ownerOnly && !client.owners.some(id => id === message.author.id)) return;

    if (command.playerOnly && !player) return message.reply(`**${client.emotes.errado} › ${t('music:noPlayer')}**`);

    if (command.sameChannel) {
      if (!message.member.voice.channel) return message.reply(`**${client.emotes.errado} › ${t('music:channelError')}**`);
      if (message.guild.members.me.voice.channel) {
        if (message.member.voice.channel.id !== message.guild.members.me.voice.channel?.id) return message.reply(`**${client.emotes.errado} › ${t('music:channelError')}**`);
      }
    }

    client.utils.sendLogs({
      type: 'command',
      content: `\`---\`\nData: **${Day(Date.now()).format('DD/MM/YYYY HH:mm:ss')}**\nComando **${command.name}** executado no servidor **${message.guild.name}** (\`${message.guild.id}\`)\nUsuario: **${message.author.tag}** (\`${message.author.id}\`)\n\`---\``
    });

    await command.exec({ client, message, args, player, t }).catch((err) => {
      client.logger.warn(err, { tags: ['Commands']});
      message.reply({
        content: `**${client.emotes.errado} › ${t('events:messageCreate.error', {
          command: command.name
        })}**`,
        components: [new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel(t('events:messageCreate.support'))
            .setURL('https://discord.com/invite/vYEutrG7gY'))]
      });
    });
    await client.db.user.findOneAndUpdate({ _id: message.author.id }, {
      $set: {
        lastCommandUsed: Date.now()
      }
    });
  }
};
