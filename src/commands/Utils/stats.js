const { MessageEmbed } = require('discord.js-light');
const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
  name: `stats`,
  aliases: ['estatisticas', 'botinfo', 'bi', 'uptime' ],
  cooldown: 3,
  ownerOnly: false,
  description: '[ 📚 Utils ] Show some infos about me.',
  options: [],
  async run({ client, message, args, player, lang }) {

        const embed = new MessageEmbed()
          .setColor(client.color)
          .setDescription(
            `> **${
              message.author
            }, ${lang.commands.stats.message}! **\n ** ${
              Emojis.estrela
            } __${lang.commands.stats.stats}__ \n> Servers \`${await client.shard
              .fetchClientValues("guilds.cache.size")
              .then((x) =>
                x.reduce((f, y) => f + y)
              )}\`\n> Uptime \`${client.utils.formatTime(client.uptime
            )}\`\n> RAM \`${client.utils.formatSizeUnits(
              process.memoryUsage().heapUsed
            )}/${client.utils.formatSizeUnits(require("os").totalmem())}\`\n${
              Emojis.rocket
            }__Links__\n> [${lang.commands.stats.inviteMe}](https://dsc.gg/siesta-bot) **`
          )
          .setTitle(` ${Emojis.star} | __Siesta__`)
          .setFooter({
            text: `${lang.commands.stats.createdBy}: ${await client.users
            .fetch("431768491759239211")
            .then((x) => x.tag)}`,
            iconURL: await client.users
              .fetch("431768491759239211")
              .then((x) => x.displayAvatarURL({ dynamic: true })),
          })
          .setTimestamp();

        message.reply({ embeds: [embed] });
  }
};
