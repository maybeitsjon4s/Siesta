const { exec } = require('child_process');
const ANSI_REGEX = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
module.exports = {
	name: 'shell',
	aliases: ['terminal', 'sh', 'sheel'],
	cooldown: 3,
	ownerOnly: true,
	async exec({ message, args }) {
     
		const cmd = args.join(' ');
		if(!cmd) return;

		exec(cmd, (err, res) => {
			if(err) return message.reply(`\`\`\`${err}\`\`\``);
			message.reply({ content: `\`\`\`\n$ ${cmd}\n\n${res.replace(ANSI_REGEX, '')}\`\`\`` });
		});
	},
};
