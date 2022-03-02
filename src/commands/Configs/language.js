const { Embed, ActionRow, ButtonComponent, ButtonStyle } = require(`discord.js`);
const Emojis = require(`../../Structures/Utils/emojis`);

module.exports = {
  name: 'language',
  aliases: ['setlang', 'lang'],
  ownerOnly: false,
  run: async (client, message, args, player, lang) => {
    
      const row = new ActionRow().setComponents(
        new ButtonComponent()
        .setLabel('Português')
        .setEmoji({
          name: '🇵🇹',
          animated: false
        })
        .setStyle(ButtonStyle.Secondary)
        .setCustomId('pt'),
        new ButtonComponent()
        .setLabel('English')
        .setEmoji({
          name: '🇺🇸',
          animated: false
        })
        .setStyle(ButtonStyle.Secondary)
        .setCustomId('en')
      );

        if (!message.member.permissions.has('ManageGuild') && !client.owners.some(id => id === message.author.id)) return message.reply(`${Emojis.errado}** » ${lang.commands.language.errorPerm}**`)

        const embed = new Embed()
          .setColor(client.color)
          .setFooter({
            text: message.author.tag,
      iconURL: message.author.displayAvatarURL({
              dynamic: true
            })
          })
          .setTitle(`${Emojis.config} | __Siesta__`)
          .setDescription(`${message.author}, ${lang.commands.language.message}`)
        message.reply({
          embeds: [embed],
          components: [row]
        }).then(msg => {

          const collector = msg.createMessageComponentCollector({
            time: 180000
          });

          collector.on('collect', async (i) => {
            
            if (i.user.id !== message.author.id) return i.reply({
              content: `${Emojis.errado}** » ${lang.commands.language.onlyAuthor}**`,
              ephemeral: true
            })
            if (i.customId == 'pt') {
              i.deferUpdate()
              await client.db.guild.findOneAndUpdate({
                _id: message.guild.id
              }, {
                $set: {
                  lang: 1
                }
              })
              msg.edit({
                content: `**${Emojis.config} » ${lang.commands.language.portugueseSeted}!**`,
                embeds: [],
                components: []
              });
            }
            if (i.customId == 'en') {
              i.deferUpdate()
              await client.db.guild.findOneAndUpdate({
                _id: message.guild.id
              }, {
                $set: {
                  lang: 0
                }
              })
              msg.edit({
                content: `**${Emojis.config} » ${lang.commands.language.englishSeted}!**`,
                embeds: [],
                components: []
              })
            }
          });
          collector.on('end', () => {
            msg.delete()
          });
        })
  }
}
