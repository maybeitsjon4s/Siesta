import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export default {
  name: 'language',
  aliases: ['setlang', 'lang'],
  playerOnly: false,
  sameChannel: false,
  ownerOnly: false,
  async exec({ client, message, t }) {

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Português')
        .setEmoji({
          name: 'pt',
          id: '965658002994651237',
          animated: false
        })
        .setStyle(ButtonStyle.Secondary)
        .setCustomId('pt'),
      new ButtonBuilder()
        .setLabel('English')
        .setEmoji({
          name: 'en',
          id: '965658073203081257',
          animated: false
        })
        .setStyle(ButtonStyle.Secondary)
        .setCustomId('en')
    );

    if (!message.member.permissions.has('ManageGuild') && !client.owners.some(id => id === message.author.id)) return message.reply(`${client.emotes.errado}** › ${t('commands:language.errorPerm')}**`);

    const embed = new EmbedBuilder()
      .setColor(client.color)
      .setFooter({
        text: message.author.tag,
        iconURL: message.author.displayAvatarURL({
          dynamic: true
        })
      })
      .setTitle(`${client.emotes.config} • __Siesta__`)
      .setDescription(`${message.author}, ${t('commands:language.message')}`);

    message.reply({
      embeds: [embed],
      components: [row]
    }).then((msg) => {

      const collector = msg.createMessageComponentCollector({
        time: 180000
      });

      collector.on('collect', async (i) => {

        if (i.user.id !== message.author.id) return i.reply({
          content: `${client.emotes.errado}** › ${t('commands:language.onlyAuthor')}**`,
          ephemeral: true
        });
        if (i.customId == 'pt') {
          i.deferUpdate();
          await client.db.guild.findOneAndUpdate({
            _id: message.guild.id
          }, {
            $set: {
              lang: 1
            }
          });
          msg.edit({
            content: `**${client.emotes.config} › ${t('language.portugueseSeted')}!**`,
            embeds: [],
            components: []
          });
        }
        if (i.customId == 'en') {
          i.deferUpdate();
          await client.db.guild.findOneAndUpdate({
            _id: message.guild.id
          }, {
            $set: {
              lang: 0
            }
          });
          msg.edit({
            content: `**${client.emotes.config} › ${t('language.englishSeted')}!**`,
            embeds: [],
            components: []
          });
        }
      });
      collector.on('end', () => {
        msg.delete();
      });
    });
  }
};
