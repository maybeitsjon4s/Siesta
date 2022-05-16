import Day from 'dayjs';
import i18next from 'i18next';
import { MessageActionRow, MessageButton } from 'discord.js';

export default {
  name: 'interactionCreate',
  async exec (client, interaction) {

    if(interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);

      if(!interaction.guild) return;

      let user = await client.db.user.findOne({ _id: interaction.user.id });
      let guild = await client.db.guild.findOne({ _id: interaction.guild.id });

      if(!guild) guild = await client.db.guild.create({ _id: interaction.guild.id });
      if(!user) user = await client.db.user.create({ _id: interaction.user.id });

      if(user?.blacklist) return;

      let t;

      if(interaction.locale === 'pt-BR') {
        t = i18next.getFixedT('pt-BR');
      } else {
        t = i18next.getFixedT('en-US');
      }

      if(command && command.ownerOnly && !client.owners.some(id => id === interaction.user.id)) return;

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

      if(command.ownerOnly && !client.owners.some(id => id === interaction.user.id)) return;

      if(command.playerOnly && !player) return message.reply({
        content: `**${client.Emojis.errado} › ${t('music:noPlayer')}**`,
        ephemeral: true
      });

      if(command.sameChannel) {
        if(!message.member.voice.channel) return message.reply({
          content: `**${client.Emojis.errado} › ${t('music:channelError')}**`,
          ephemeral: true
        });
        if(message.member.voice.channel.id !== message.guild.me.voice.channel?.id) return message.reply({
          content: `**${client.Emojis.errado} › ${t('music:channelError')}**`,
          ephemeral: true
        });
      }

      await command.exec({ client, message, args, player, t }).catch(err => {
        client.logger.error(`Erro em ${command.name}, Servidor: ${message.guild.id}, Usuario: ${interaction.user.id}`);
        client.logger.stack(err.stack);

        interaction.reply({
          content: `**${client.Emojis.errado} › ${t('events:messageCreate.error', {
            command: command.name
          })}**`,
          components: [
            new MessageActionRow().addComponents(new MessageButton()
              .setStyle('LINK')
              .setLabel(t('events:messageCreate.support'))
              .setURL('https://discord.com/invite/vYEutrG7gY')
            )
          ],
          ephemeral: true
        });
      });

      await client.db.user.findOneAndUpdate({ _id: interaction.author.id } , {
        $set: {
          lastCommandUsed: Date.now()
        } });
    }
  }
};
