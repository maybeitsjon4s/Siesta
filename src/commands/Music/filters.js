const Emojis = require('../../Structures/Utils/emojis');
const { MessageActionRow, MessageButton } = require('discord.js')

module.exports = {
  name: 'filters',
  aliases: ['filtros', 'bassboost'],
  run: async (client, message, args, player, lang) => {
       if (!player) return message.reply(`**${Emojis.errado} » ${lang.commands.filters.noPlayer}!**`);

      if (!message.member.voice.channel) return message.reply(`**${Emojis.errado} » ${lang.commands.filters.channelError}!**`);

      if (message.member.voice.channel.id !== player.voiceChannelId) return message.reply(`**${Emojis.errado} » ${lang.commands.filters.channelError2}!**`);

        const row = new MessageActionRow().addComponents(
        new MessageButton()
        .setLabel('NightCore')
        .setStyle('SECONDARY')
        .setCustomId("nightcore"),
        new MessageButton()
        .setLabel('BassBoost')
        .setStyle('SECONDARY')
        .setCustomId('bassboost'),
        new MessageButton()
        .setLabel('8D')
        .setStyle('SECONDARY')
        .setCustomId('eightD'),
        new MessageButton()
        .setLabel(lang.commands.filters.clearLabel)
        .setStyle('SECONDARY')
        .setCustomId('clear')
      );

    message.reply({
      content: `**${Emojis.music} » ${lang.commands.filters.firstMessage}**`,
      components: [row]
    }).then(msg => {
     
          const collector = msg.createMessageComponentCollector({
            componentType: "BUTTON",
            time: 180000
          });

          collector.on('collect', async i => {
            await i.deferUpdate()
            if(i.user.id !== message.author.id) return i.followUp({
              content: `**${Emojis.errado} » ${lang.commands.filters.onlyAuthor}**`,
              ephemeral: true
            })
            switch(i.customId) {
              case 'nightcore':
                msg.edit({
                  content: `**${Emojis.music} » ${lang.commands.filters.changedMessage.replace('{}', 'NightCore')}**`,
                  components: []
                })
                player.filters.clear();
                player.filters
                .setTimescale({ pitch: 1.2, rate: 1.1 }, false)
                .setEqualizer([0.2, 0.2], false)
                .setTremolo({ depth: 0.3, frequency: 14 }, false)
                .apply();
                break;
              case 'bassboost':
                msg.edit({
                  content: `**${Emojis.music} » ${lang.commands.filters.changedMessage.replace('{}', 'Bass Boost')}**`,
                  components: []
                })
                player.filters.clear();
                player.filters.setEqualizer([0.29, 0.23, 0.19, 0.16, 0.08]).apply();
                player.bassboost = true;
                break;

              case 'eightD':
                msg.edit({
                  content: `**${Emojis.music} » ${lang.commands.filters.changedMessage.replace('{}', '8D')}**`,
                  components: []
                })
                player.filters.clear();
                player.filters.setRotation({ rotationHz: 0.2 }).apply();
                break;
              case 'clear':
                msg.edit({
                  content: `**${Emojis.music} » ${lang.commands.filters.clearFiltersMessage}**`,
                  components: []
                })
                player.filters.clear()
                break;
            }
          })
      collector.on('end', i => {
        msg.delete().catch(() => {})
      })
    })
      
  }
}

