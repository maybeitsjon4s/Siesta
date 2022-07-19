import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export default {
  name: 'filters',
  aliases: ['filtros', 'bassboost'],
  ownerOnly: false,
  playerOnly: true,
  sameChannel: true,
  descripions: '[ 🎵 Music ] Add/remove filters to the player.',
  async exec({ message, player, t, client }) {

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('NightCore')
        .setStyle(ButtonStyle.Secondary)
        .setCustomId('nightcore'),
      new ButtonBuilder()
        .setLabel('BassBoost')
        .setStyle(ButtonStyle.Secondary)
        .setCustomId('bassboost'),
      new ButtonBuilder()
        .setLabel('8D')
        .setStyle(ButtonStyle.Secondary)
        .setCustomId('eightD'),
      new ButtonBuilder()
        .setLabel(t('commands:filters.clearLabel'))
        .setStyle(ButtonStyle.Secondary)
        .setCustomId('clear')
    );

    message.reply({
      content: `**${client.emotes.music} › ${t('commands:filters.firstMessage')}**`,
      components: [row],
      fetchReply: true
    }).then(msg => {

      const collector = msg.createMessageComponentCollector({
        time: 180000
      });

      collector.on('collect', async (i) => {
        await i.deferUpdate();
        if (i.user.id !== message.author.id) return i.followUp({
          content: `**${client.emotes.errado} › ${t('commands:filters.onlyAuthor')}**`,
          ephemeral: true
        });
        switch (i.customId) {
        case 'nightcore':
          msg.edit({
            content: `**${client.emotes.music} › ${t('commands:filters.changedMessage', {
              filter: 'NightCore'
            })}**`,
            components: []
          });
          player.filters.clear();
          player.filters
            .setTimescale({ pitch: 1.2, rate: 1.1 }, false)
            .setEqualizer([0.2, 0.2], false)
            .setTremolo({ depth: 0.3, frequency: 14 }, false)
            .apply();
          break;
        case 'bassboost':
          msg.edit({
            content: `**${client.emotes.music} › ${t('commands:filters.changedMessage', {
              filter: 'Bass Boost'
            })}**`,
            components: []
          });
          player.filters.clear();
          player.filters.setEqualizer([0.29, 0.23, 0.19, 0.16, 0.08]).apply();
          player.bassboost = true;
          break;
        case 'eightD':
          msg.edit({
            content: `**${client.emotes.music} › ${t('commands:filters.changedMessage', {
              filter: '8D'
            })}**`,
            components: []
          });
          player.filters.clear();
          player.filters.setRotation({ rotationHz: 0.2 }).apply();
          break;
        case 'clear':
          msg.edit({
            content: `**${client.emotes.music} › ${t('commands:filters.clearFiltersMessage')}**`,
            components: []
          });
          player.filters.clear();
          break;
        }
      });
      collector.on('end', () => msg.delete().catch(() => { }));
    });
  }
};

