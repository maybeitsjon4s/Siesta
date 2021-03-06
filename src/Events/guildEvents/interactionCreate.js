import Day from 'dayjs';
import i18next from 'i18next';
import { ActionRowBuilder, ButtonBuilder, InteractionType, ButtonStyle } from 'discord.js';
import { request } from 'undici';
export default {
  name: 'interactionCreate',
  async exec(client, interaction) {


    if (interaction.type === InteractionType.ApplicationCommandAutocomplete) {
      if (!interaction.member) return;
      const value = interaction.options.getFocused();
      if (!value) return interaction.respond([]);
      const res = await request(`https://clients1.google.com/complete/search?client=youtube&hl=pt-PT&ds=yt&q=${encodeURIComponent(value)}`, {
        headers: {
          'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36'
        }
      }).then(async r => Buffer.from(await r.body.arrayBuffer()).toString('latin1'));

      const choices = [];

      const data = res.split('[');

      for (var i = 3, min = Math.min(8 * 2, data.length); i < min; i += 2) {
        const choice = data[i].split('"')[1].replace(/\\u([0-9a-fA-F]{4})/g, (_, cc) => String.fromCharCode(parseInt(cc, 16)));

        if (choice) {
          choices.push({
            name: choice,
            value: choice
          });
        }
      }

      interaction.respond(choices);
    }
    if (interaction.type === InteractionType.ApplicationCommand) {
      const command = client.commands.get(interaction.commandName);

      if (!interaction.guild) return;

      let user = await client.db.user.findOne({ _id: interaction.user.id });
      let guild = await client.db.guild.findOne({ _id: interaction.guild.id });

      if (!guild) guild = await client.db.guild.create({ _id: interaction.guild.id });
      if (!user) user = await client.db.user.create({ _id: interaction.user.id });

      if (user?.blacklist) return;

      let t;

      if (interaction.locale === 'pt-BR') {
        t = i18next.getFixedT('pt-BR');
      } else {
        t = i18next.getFixedT('en-US');
      }

      if (command && command.ownerOnly && !client.owners.some(id => id === interaction.user.id)) return;

      interaction.edit = interaction.editReply;
      interaction.author = interaction.user;

      const args = [];

      for (const option of interaction.options.data) {
        if (option.type === 'SUB_COMMAND') {
          if (option.name) args.push(option.name);
          option.options?.forEach((x) => {
            if (x.value) args.push(x.value);
          });
        } else if (option.value) args.push(option.value);
      }

      const player = client.music.players.get(interaction.guild.id);

      client.utils.sendLogs({
        type: 'command',
        content: `\`---\`\nData: **${Day(Date.now()).format('DD/MM/YYYY HH:mm:ss')}**\nComando **${command.name}** executado no servidor **${interaction.guild.name}** (\`${interaction.guild.id}\`)\nUsuario: **${interaction.author.tag}** (\`${interaction.author.id}\`)\n\`---\``
      });

      const message = interaction;

      if (command.ownerOnly && !client.owners.some(id => id === interaction.user.id)) return;

      if (command.playerOnly && !player) return message.reply({
        content: `**${client.emotes.errado} ??? ${t('music:noPlayer')}**`,
        ephemeral: true
      });

      if (command.sameChannel) {
        if (!message.member.voice.channel) return message.reply({
          content: `**${client.emotes.errado} ??? ${t('music:channelError')}**`,
          ephemeral: true
        });
        if (message.member.voice.channel.id !== message.guild.members.me.voice.channel?.id) return message.reply({
          content: `**${client.emotes.errado} ??? ${t('music:channelError')}**`,
          ephemeral: true
        });
      }

      await command.exec({ client, message, args, player, t }).catch(err => {
        client.logger.warn(err, { tags: ['Commands']});

        interaction.reply({
          content: `**${client.emotes.errado} ??? ${t('events:messageCreate.error', {
            command: command.name
          })}**`,
          components: [
            new ActionRowBuilder().addComponents(new ButtonBuilder()
              .setStyle(ButtonStyle.Link)
              .setLabel(t('events:messageCreate.support'))
              .setURL('https://discord.com/invite/vYEutrG7gY')
            )
          ],
          ephemeral: true
        });
      });

      await client.db.user.findOneAndUpdate({ _id: interaction.author.id }, {
        $set: {
          lastCommandUsed: Date.now()
        }
      });
    }
  }
};
