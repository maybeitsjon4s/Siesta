const { exec } = require("child_process")

module.exports = {
  name: 'shell',
  aliases: ['terminal', 'sh', 'sheel'],
  cooldown: 3,
  ownerOnly: true,
  async run({ client, message, args, player, lang }) {
     
    const cmd = args.join(" ")
    if(!cmd) return;

    exec(cmd, (err, res) => {
      if(err) return message.reply(`\`\`\`${err}\`\`\``)
      message.reply({content: `\`\`\`prolong\n$ ${cmd}\n\n${res.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '')}\`\`\``})
  })
  },
};
