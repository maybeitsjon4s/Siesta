const { MessageEmbed, MessageActionRow, MessageButton } = require(`discord.js`);
const { readdirSync } = require('fs');
const Emojis = require(`../../Structures/Utils/emojis`);

module.exports = {
  name: 'help',
  aliases: ['ajuda', 'commands', 'h'],
  run: async (client, message, args, player, lang) => {

      const mod = readdirSync(`./src/commands/Mod`).map((arquivo) => `${arquivo.replace(/.js/g, ``)}`)
      const configs = readdirSync(`./src/commands/Configs`).map((arquivo) => `${arquivo.replace(/.js/g, ``)}`)
      const eco = readdirSync(`./src/commands/Economy`).map((arquivo) => `${arquivo.replace(/.js/g, ``)}`)
      const utils = readdirSync(`./src/commands/Utils`).map((arquivo) => `${arquivo.replace(/.js/g, ``)}`)
      const msc = readdirSync(`./src/commands/Music`).map((arquivo) => `${arquivo.replace(/.js/g, ``)}`)
      
        const row = new MessageActionRow().addComponents(
          new MessageButton()
            .setLabel(`Me Adicione`)
            .setStyle(`LINK`)
            .setURL(`https://dsc.gg/siesta-bot`),
          new MessageButton()
            .setLabel(`Servidor de Suporte`)
            .setStyle(`LINK`)
            .setURL(`https://discord.gg/vYEutrG7gY`)
        );

        let embed = new MessageEmbed()
          .setColor(client.color)
          .setDescription(`> ${message.author}, ${lang.commands.help.message.replace('{}', '**' + client.commands.size + '**')}!`)
          .addField(`${Emojis.ban} » __${lang.commands.help.moderation}__ [${mod.length}]`, `\`${mod.join(", ")}\``)
          .addField(`${Emojis.config} » __${lang.commands.help.config}__ [${configs.length}]`, `\`${configs.join(", ")}\``)
          .addField(`${Emojis.dima} » __${lang.commands.help.economy}__ [${eco.length}]`, `\`${eco.join(", ")}\``)
          .addField(`${Emojis.star} » __${lang.commands.help.utils}__ [${utils.length}] `, `\`${utils.join(", ")}\``)
          .addField(`${Emojis.music} » __${lang.commands.help.music}__ [${msc.length}]`, `\`${msc.join(", ")}\``)
          .setFooter({
            text: message.author.tag,
            iconURL: message.author.displayAvatarURL({ dynamic: true }),
          })
          .setTimestamp();
        message.reply({ embeds: [embed], components: [row] });
      }
  }
