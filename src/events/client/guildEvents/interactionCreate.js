const Emojis = require('../../../Structures/Utils/emojis.js');
const Day = require('dayjs');

module.exports = async(client, interaction) => {

  if(interaction.isCommand()) {
    const command = client.commands.get(interaction.commandName);

    if(!interaction.guild) return;

    let user = await client.db.user.findOne({ _id: interaction.user.id });
    let guild = await client.db.guild.findOne({ _id: interaction.guild.id });

    if(!guild) guild = await client.db.guild.create({ _id: interaction.guild.id });
    if(!user) user = await client.db.user.create({ _id: interaction.user.id });

    if(user?.blacklist) return;

    let lang = guild.lang || 0;

    switch(lang) {
    case 1:
      lang = client.langs.pt;
      break;
    case 0:
      lang = client.langs.en;
      break;
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

    client.utils.sendLogs(`\`---\`\nData: **${Day(Date.now()).format('DD/MM/YYYY HH:mm:ss')}**\nComando **${command.name}** executado no servidor **${interaction.guild.name}** (\`${interaction.guild.id}\`)\nUsuario: **${interaction.author.tag}** (\`${interaction.author.id}\`)\n\`---\``);
    const message = interaction;

    if(command.playerOnly && !player) return message.reply({
      content: `**${Emojis.errado} › ${lang.music.noPlayer}**`,
      ephemeral: true
    });

    if(command.sameChannel && !message.member.voice.channel || message.member.voice.channel?.id !== message.guild.me.voice.channel?.id) return message.reply({
      content: `**${Emojis.errado} › ${lang.music.channelError}**`,
      ephemeral: true
    });

    await command.exec({ client, message, args, player, lang }).catch(err => {
      client.logger.error(`Erro em ${command.name}`);
      client.logger.stack(err.stack);

      interaction.reply({
        embeds: [{
          color: client.color,
          description: `**${Emojis.rocket} › ` + lang.events.messageCreate.error.replace('{}', command.name) + '**' + '```\n' + err + '```'
        }],
        ephemeral: true
      });
    });

    await client.db.user.findOneAndUpdate({ _id: interaction.author.id } , {
      $set: {
        lastCommandUsed: Date.now()
      } });
  }
}; 
