import { MessageEmbed, MessageActionRow, MessageButton } from 'discord.js';

export default {
  name: 'language',
  aliases: ['setlang', 'lang'],
  playerOnly: false,
  sameChannel: false,
  ownerOnly: false,
  async exec({ client, message, t }) {
    
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel('Português')
        .setEmoji({
          name: 'pt',
          id: '965658002994651237',
          animated: false
        })
        .setStyle('SECONDARY')
        .setCustomId('pt'),
      new MessageButton()
        .setLabel('English')
        .setEmoji({
          name: 'en',
          id: '965658073203081257',
          animated: false
        })
        .setStyle('SECONDARY')
        .setCustomId('en')
    );

    if (!message.member.permissions.has('MANAGE_GUILD') && !client.owners.some(id => id === message.author.id)) return message.reply(`${client.emj.errado}** › ${t('commands:language.errorPerm')}**`);

    const embed = new MessageEmbed()
      .setColor(client.color)
      .setFooter({
        text: message.author.tag,
        iconURL: message.author.displayAvatarURL({
          dynamic: true
        })
      })
      .setTitle(`${client.emj.config} • __Siesta__`)
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
          content: `${client.emj.errado}** › ${t('commands:language.onlyAuthor')}**`,
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
            content: `**${client.emj.config} › ${t('language.portugueseSeted')}!**`,
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
            content: `**${client.emj.config} › ${t('language.englishSeted')}!**`,
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
