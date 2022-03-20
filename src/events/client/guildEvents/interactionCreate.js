const Emojis = require('../../../Structures/Utils/emojis.js');
const Day = require('dayjs')

module.exports = async(client) => {

  if(interaction.isCommand()) {
    const command = client.commands.get(interaction.commandName)

    if(!interaction.guild) return

    let user = client.db.user.findOne({ _id: interaction.user.id })
    let guild = client.db.guild.findOne({ _id: interaction.guild.id })

    if(!guild) guild = await client.db.guild.create({ _id: interaction.guild.id })
    if(!user) user = await client.db.user.create({ _id: interaction.user.id })

    if(user?.blacklist) return;

    let lang = guild.lang || 0;

    switch(lang) {
      case 1:
        lang = client.langs.pt;
      case 0:
        lang = client.langs.en;
    }

    if(command && command.ownerOnly && !client.owners.some(id => id === interaction.user.id)) return

    interaction.edit = interaction.editReply;
    interaction.author = interaction.user;
    interaction.member = interaction.guild.member.cache.get(interaction.user.id);

     const args = [];

    for (let option of interaction.options.data) {
        if (option.type === "SUB_COMMAND") {
            if (option.name) args.push(option.name);
              option.options?.forEach((x) => {
                if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }

    const message = interaction;

    const player = client.music.players.get(interaction.guild.id)

    client.utils.sendLogs(`\`---\`\nData: **${Day(Date.now()).format('DD/MM/YYYY HH:mm:ss')}**\nComando **${command.name}** executado no servidor **${message.guild.name}** (\`${message.guild.id}\`)\nUsuario: **${message.author.tag}** (\`${message.author.id}\`)\n\`---\``)

    if(command) command.run({ client, message, args, player, lang }).catch(err => {
      console.log(`\n\nErro no comando ${command.name}`.red + String(err.stack).gray)

      interaction.reply({
        embeds: [
          {
          color: client.color,
          description: `**${Emojis.rocket} › ` + lang.events.messageCreate.error.replace('{}', command.name) + '**' + '\`\`\`\n' + err + '\`\`\`'
          }
        ],
        ephemeral: true
      })
    })

    await client.db.user.findOneAndUpdate({ _id: message.auhtor.id },
    {
    $set: {
    lastCommandUsed: Date.now()
    }
    })

  }
} 
