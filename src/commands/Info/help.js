const { MessageEmbed, MessageActionRow, MessageButton, ButtonStyle } = require(`discord.js-light`);
const { readdirSync } = require('fs');
const Emojis = require(`../../Structures/Utils/emojis`);

module.exports = {
  name: 'help',
  aliases: ['ajuda', 'commands', 'h'],
  cooldown: 6,
  ownerOnly: false,
  description: '[ 📚 Utils ] Show the list of commands and some important links.',
  options: [],
  async exec({ client, message, args, player, lang }) {

      const mod = readdirSync('./src/commands/Mod').map((arquivo) => `${arquivo.replace(/.js/g, '')}`)
      const configs = readdirSync('./src/commands/Configs').map((arquivo) => `${arquivo.replace(/.js/g, ``)}`)
      const fun = readdirSync('./src/commands/Fun').map((arquivo) => `${arquivo.replace(/.js/g, '')}`)
      const info = readdirSync('./src/commands/Info').map((arquivo) => `${arquivo.replace(/.js/g, '')}`)
      const msc = readdirSync('./src/commands/Music').map((arquivo) => `${arquivo.replace(/.js/g, '')}`)
      
        const row = new MessageActionRow().addComponents(
          new MessageButton()
            .setLabel(lang.commands.help.inviteMe)
            .setStyle('LINK')
            .setURL('https://dsc.gg/siesta-bot'),
          new MessageButton()
            .setLabel(lang.commands.help.support)
            .setStyle('LINK')
            .setURL('https://discord.gg/vYEutrG7gY')
        );

        message.reply({ embeds: [{
          color: client.color,
          description: `> ${message.author}, ${lang.commands.help.message.replace('{}', '**' + client.commands.size + '**')}!`,
          fields: [{
              name: `${Emojis.ban} › __${lang.commands.help.moderation}__ [${mod.length}]`,
              value: `\`${mod.join(", ")}\``
            },
            {
              name: `${Emojis.config} › __${lang.commands.help.config}__ [${configs.length}]`,
              value: `\`${configs.join(", ")}\``
            },
            {
              name: `${Emojis.estrela} › __${lang.commands.help.fun}__ [${fun.length}]`,
              value: `\`${fun.join(", ")}\``
            },
            {
              name: `${Emojis.star} › __${lang.commands.help.info}__ [${info.length}] `,
              value: `\`${info.join(", ")}\``
            },
            {
              name: `${Emojis.music} › __${lang.commands.help.music}__ [${msc.length}]`,
              value: `\`${msc.join(", ")}\``
            }],
          footer: {
            iconURL: message.author.displayAvatarURL({ dynamic: true }),
            text: message.author.tag
          }
        }], 
          components: [row] });

      }
  }
