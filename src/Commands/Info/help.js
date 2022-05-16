import { MessageActionRow, MessageButton } from 'discord.js';
import { readdirSync } from 'node:fs';

export default {
  name: 'help',
  aliases: ['ajuda', 'commands', 'h'],
  ownerOnly: false,
  playerOnly: false,
  sameChannel: false,
  description: '[ 📚 Utils ] Show the list of commands and some important links.',
  options: [{
    name: 'command',
    description: 'The command you wanna see infos about',
    type: 'STRING',
    required: false
  }],
  async exec({ client, message, args, t }) {

    const mod = readdirSync('./src/Commands/Mod').map((arquivo) => `${arquivo.replace(/.js/g, '')}`);
    const configs = readdirSync('./src/Commands/Configs').map((arquivo) => `${arquivo.replace(/.js/g, '')}`);
    const info = readdirSync('./src/Commands/Info').map((arquivo) => `${arquivo.replace(/.js/g, '')}`);
    const msc = readdirSync('./src/Commands/Music').map((arquivo) => `${arquivo.replace(/.js/g, '')}`);
      
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel(t('commands:help.inviteMe'))
        .setStyle('LINK')
        .setURL('https://dsc.gg/siesta-bot'),
      new MessageButton()
        .setLabel(t('commands:help.support'))
        .setStyle('LINK')
        .setURL('https://discord.gg/vYEutrG7gY'));

    if(args[0] && client.commands.get(args[0]) || client.aliases.get(args[0])) {
      const command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));

      return message.reply({
        embeds: [{
          color: client.color,
          fields: [{
            name: `${client.Emojis.rocket} ${this.formatName(command.name)}`,
            value: `**${t('commands:help.commandDescription')} ›** \`${command.description || '???'}\`\n**${t('commands:help.aliases')} ›** \`${command.aliases.length > 0 ? command.aliases.join(', ') : ''}\``
          }]
        }]
      });
    }

    message.reply({ embeds: [{
      color: client.color,
      description: `> ${message.author}, ${t('commands:help.message', {
        commands: client.commands.size.toString()
      })}!`,
      fields: [{
        name: `${client.Emojis.ban} › __${t('commands:help.moderation')}__ [${mod.length}]`,
        value: `\`\`\`${mod.join(' | ')}\`\`\``
      },
      {
        name: `${client.Emojis.config} › __${t('commands:help.config')}__ [${configs.length}]`,
        value: `\`\`\`${configs.join(' | ')}\`\`\``
      },
      {
        name: `${client.Emojis.star} › __${t('commands:help.info')}__ [${info.length}] `,
        value: `\`\`\`${info.join(' | ')}\`\`\``
      },
      {
        name: `${client.Emojis.music} › __${t('commands:help.music')}__ [${msc.length}]`,
        value: `\`\`\`${msc.join(' | ')}\`\`\``
      }],
      footer: {
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
        text: message.author.tag
      }
    }], 
    components: [row] });

  },
  formatName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }
};
