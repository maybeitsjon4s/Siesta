import { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } from 'discord.js';

export default {
  name: 'warns',
  aliases: ['warnings', 'infractions', 'warnslist', 'warnlist'],
  ownerOnly: false,
  playerOnly: false,
  sameChannel: false,
  async exec({ client, message, args, t }) {

    const member = message.mentions.members.first() || message.guild.members.fetch(args[0]).catch(() => { }) || message.member;

    let doc = await client.db.guild.findOne({ _id: message.guild.id });
    let queue = doc.warns[member.id];
    if (!queue) queue = [];
    if (queue.length === 0) return message.reply(`**${client.emotes.errado} › ${t('commands:warns.noWarns', { user: (member.user?.toString() || message.author.toString()) })} **`);
    const maxPerPage = 10;

    const pages = Math.ceil(queue.length / maxPerPage);

    let page = 0;

    let info = queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((e, i) => `**[ ${(i + 1) + page * maxPerPage} ]** ${e}`);

    const pageTranslated = t('commands:warns.page');

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('left').setStyle(ButtonStyle.Secondary).setEmoji({
        name: 'esquerda',
        id: '910270672121512007',
        animated: false
      }),
      new ButtonBuilder().setCustomId('right').setStyle(ButtonStyle.Secondary).setEmoji({
        name: 'direita',
        id: '910270630379782245',
        animated: false
      })
    );

    const embed = new EmbedBuilder()
      .setTitle(`${client.emotes.ban} • __Siesta__`)
      .setDescription(info.join('\n'))
      .setColor(client.color)
      .setFooter({ text: pageTranslated + ` ${page + 1}/${pages}` });

    const msg = await message.reply({
      embeds: [embed],
      components: [row]
    });

    const collector = msg.createMessageComponentCollector({
      componentType: 'BUTTON',
      time: 500000
    });


    collector.on('collect', (i) => {
      i.deferUpdate();
      if (i.user.id !== message.author.id) return;

      switch (i.customId) {
        case 'left':
          if (page !== 0) {
            --page;
            embed.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((e, i) => `**[ ${(i + 1) + page * maxPerPage} ]** ${e}`).join('\n'));
            embed.setFooter({
              text: pageTranslated + ` ${page + 1}/${pages}`
            });
            msg.edit({
              embeds: [embed]
            });
          }
          break;
        case 'right':
          if (page < pages - 1) {
            page++;
            embed.setDescription(queue.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((e, i) => `**[ ${(i + 1) + page * maxPerPage} ]** ${e}`).join('\n'));
            embed.setFooter({
              text: pageTranslated + ` ${page + 1}/${pages}`
            });
            msg.edit({
              embeds: [embed]
            });
          }
          break;
      }
    });
  }
};
