const { MessageAttachment, MessageEmbed } = require(`discord.js`);

const Emojis = require(`../../Structures/Utils/emojis`);

const { loadImage, registerFont, createCanvas } = require("canvas");
const { fillTextWithTwemoji } = require('node-canvas-with-twemoji-and-discord-emoji');
registerFont("src/Assets/Fonts/seguibl.ttf", {
    family: "Segoe UI Black"
});

module.exports = {
  name: 'mine',
  aliases: ['minerar', 'm'],
  ownerOnly: false,
  run: async (client, message, args, player, lang) => {

    const user = await client.db.user.findOne({
      _id: message.author.id
    })

      if (!user.itens.picareta) return message.reply(`**${Emojis.errado} › ${lang.commands.mine.noPickaxe}!**`);

      if (["sell", "vender"].some(x => x == args[0])) {

        if (!user.mine.esmeraldas) return message.reply({
          content: `**${Emojis.errado} › ${lang.commands.mine.noEmeralds}!**`
        })

        const value = user.mine.level  * (user.mine.esmeraldas * 150)

        message.reply({
          content: `**${Emojis.dima} › ${lang.commands.mine.sold.replace('{emeralds}', user.mine.esmeraldas.toLocaleString()).replace('value', value.toLocaleString())}**`
        })

        await client.db.user.findOneAndUpdate({
          _id: message.author.id
        }, {
          $set: {
            "mine.esmeraldas": 0,
            money: user.money + value
          }
        })
      }

      if (["up"].some(x => x == args[0])) {

        if (user.mine.level == 6) return message.reply({
          content: `**${Emojis.errado} › ${lang.commands.mine.maxLevel}.**`
        })

        if (user.mine.exp !== 2000) return message.reply({
          content: `**${Emojis.errado} › ${lang.commands.mine.needMoreExp} \`${user.mine.exp}/2000\`.**`
        })

        await client.db.user.findOneAndUpdate({
          _id: message.author.id
        }, {
          $set: {
            "mine.level": user.mine.level + 1,
            "mine.exp": user.mine.exp - 2000,
          }

        })
        message.reply({ content: `${Emojis.dima}** › ${lang.commands.mine.up}!**`})
      }
      if (["help", "ajuda", "h"].some(x => x == args[0])) {

        const embed = new MessageEmbed()
          .setTitle(`${Emojis.dima} | __Siesta__`)
          .setDescription(String(lang.commands.mine.help))
          .setColor(client.color)
          .setFooter({
            text: message.author.tag,
            iconURL: message.author.displayAvatarURL()
          })

        message.reply({
          embeds: [embed]
        })
      }
      if(["status", "info"].some(x => x == args[0])) {

        const embed = new MessageEmbed()
        .setTitle(`${Emojis.dima} | __Siesta__`)
        .setColor(client.color)
        .setFooter({
          text: message.author.tag,
          iconURL: message.author.displayAvatarURL()
        })
        .addFields(
          {
            name: `${Emojis.esmeralda} › ${lang.commands.mine.emeralds}`,
            value: '`' + user.mine.esmeraldas.toLocaleString() + '`'
          },
          {
            name: `${Emojis.rocket} › ${lang.commands.mine.level}`,
            value: '`' + user.mine.level.toString() + '`'
          },
          {
            name: `${Emojis.estrela} › ${lang.commands.mine.exp}`,
            value: '`' + user.mine.exp.toString() + '/2000`'
          }
        )

        message.reply({ embeds: [embed]})
      }

      if (!args[0]) {

        if (user.cooldowns.mine !== null && 1999999 - (Date.now() - user.cooldowns.mine) > 0) {

          message.reply(`**${Emojis.errado} › ${lang.commands.mine.cooldown} \`${client.utils.formatTime(client.utils.convertMilliseconds(1999999 - (Date.now() - user.cooldowns.mine)))}\`**`);

        } else {

          let amount = Math.floor(Math.random() * (50 - 20) + 20);

          await client.db.user.findOneAndUpdate({
            _id: message.author.id
          }, {
            $set: {
              "mine.esmeraldas": user.mine.esmeraldas + amount,
              "mine.exp": user.mine.exp + 100,
              "cooldowns.mine": Date.now()
            }
          })

          message.reply(`**${Emojis.dima} › ${message.author} ${lang.commands.mine.mined.replace('{amount}', amount)}**`);
        }
      }
    }
  }
