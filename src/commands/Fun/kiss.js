const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
  name: 'kiss',
  aliases: ['beijar'],
  cooldown: 2,
  ownerOnly: false,
  description: '[ 📚 Utils ] Kisses someone.',
  options: [],
  async exec({ client, message, args, player, lang }) {

        const gifList = [
          `https://media.tenor.com/images/27171b8a85bc1adf0382032a4502f491/tenor.gif`,
          `https://media1.tenor.com/images/bad0b56de3d8dd30751abd8a74d91a0f/tenor.gif?itemid=22535007`,
          `https://media1.tenor.com/images/2adea55d1415e5c7add98e8e4095b259/tenor.gif?itemid=22535024`,
          `https://media1.tenor.com/images/1306732d3351afe642c9a7f6d46f548e/tenor.gif?itemid=6155670`,
          `https://media1.tenor.com/images/24f3591fcdcf239572c89cddbc3a934d/tenor.gif?itemid=18142099`,
          `https://media1.tenor.com/images/bc5e143ab33084961904240f431ca0b1/tenor.gif?itemid=9838409`,
          `https://media1.tenor.com/images/6ecbf15e9460be6e3185e314c3cde3c3/tenor.gif?itemid=22535046`,
          `https://media1.tenor.com/images/d8ef848243e8b78b24589436b5bd3502/tenor.gif?itemid=11831573`,
          `https://media1.tenor.com/images/2165e6adfd32a9390689b892dd165766/tenor.gif?itemid=13855137`,
          `https://media1.tenor.com/images/d7d5951be234831e7b66cb5b77d3729f/tenor.gif?itemid=19656151`,
          `https://media1.tenor.com/images/cdbfd43470eb16e7159b04e2ce57b04a/tenor.gif?itemid=19635735`,
          `https://media1.tenor.com/images/9bced8f065fdcc5a029a9ece04264909/tenor.gif?itemid=14969754`,
        ];

        const randomGif = gifList[Math.floor(Math.random() * gifList.length)];
        let pessoa = await client.utils.getUser(args[0], message);

        if (!pessoa) return message.reply(`**${Emojis.errado} › ${lang.commands.kiss.noMention}**`);

        message.reply({
          files: [randomGif],
          content: `**${Emojis.heart} › ${message.author} ${lang.commands.kiss.message} ${pessoa}!**`,
        });
      }
}
