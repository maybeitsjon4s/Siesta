const { MessageEmbed, MessageActionRow, MessageSelectMenu, } = require(`discord.js`);
const Emojis = require(`../../Structures/Utils/emojis`);
 const Guild = require("../../database/Schemas/Guild");
const User = require("../../database/Schemas/User")
module.exports = {
  name: `shop`,
  category: `economy`,
  aliases: [`loja`],
  run: async (client, message, args, player, lang) => {

      const user = await User.findOne({ _id: message.author.id })

        const row = new MessageActionRow().addComponents(
          new MessageSelectMenu()
            .setCustomId(`selectCustomId`)
            .setPlaceholder(String(lang.commands.shop.menuLabel))
            .addOptions([
              {
                label: lang.commands.shop.pickaxe,
                emoji: Emojis.picareta,
                value: 'pickaxe',
              },
              {
                label: 'Vip',
                emoji: Emojis.vip,
                value: 'vip',
              },
            ])
        );

        const embed = new MessageEmbed()
          .setTitle(`${Emojis.dima} | __Siesta__`)
          .setColor(client.color)
          .setFooter({
            text: message.author.tag,
            iconURL: message.author.displayAvatarURL({ dynamic: true }),
          })
          .setTimestamp()
          .setDescription(`${lang.commands.shop.embed.replace('{Emojis.picareta}', Emojis.picareta).replaceAll('{Emojis.dima}', Emojis.dima).replaceAll('{Emojis.vip}', Emojis.vip).replace('{picareta}', user.itens.picareta ? 1 : 0).replace('{vip}', user.vip ? 1 : 0)}`);

        message.reply({ embeds: [embed], components: [row] }).then((msg) => {
          let coletor = msg.createMessageComponentCollector({
            componentType: 'SELECT_MENU',
          });
          coletor.on(`collect`, async (i) => {
            if (i.user.id != message.author.id)
              return i.reply({
                content: `**${Emojis.errado} » ${lang.commands.shop.onlyAuthor}!**`,
                ephemeral: true
              });

            if (i.values.toString() === 'pickaxe') {

              if (user.money < Number(50000))
                return i.reply({
                  content: `**${Emojis.errado} » ${lang.commands.shop.noDiamonds}!**`,
                  ephemeral: true
                });

              if (user.itens.picareta) return i.reply({
                  content: `**${Emojis.errado} » ${lang.commands.shop.havePickaxe}!**`,
                  ephemeral: true
                });
                await User.findOneAndUpdate({ _id: message.author.id }, {
                  $set: {
                    money: user.money - 50000,
                    "itens.picareta": true
                  }
                })

              message.reply({
                content: `**${Emojis.picareta} » ${lang.commands.shop.buyedPickaxe}!**`,
              });
            }
            if (i.values.toString() == 'vip') {

              if (user.money < 250000)
                return i.reply({
                  content: `**${Emojis.errado} » ${lang.commands.shop.noDiamonds}!**`,
                  ephemeral: true
                });

              if (user.vip)
                return i.reply({
                  content: `**${Emojis.errado} » ${lang.commands.shop.haveVip}!**`,
                  ephemeral: true
                });

              await User.findOneAndUpdate({ _id: message.author.id },
                {
                  $set: {
                    money: user.money - 250000,
                    vip: true
                  }
                })

              message.reply({
                content: `**${Emojis.vip} ${lang.commands.shop.buyedVip}!**`,
              });
            }
          });
        });
          }
  }
