const Emojis = require(`../../Structures/Utils/emojis`);

module.exports = {
  name: 'hug',
  aliases: ['abraçar'],
  run: async (client, message, args, player, lang) => {

        const list = [
          `https://c.tenor.com/JTqXUbfSSkYAAAAC/anime-bed.gif`,
          `https://i.imgur.com/r9aU2xv.gif`,
          `https://i.imgur.com/wOmoeF8.gif`,
          `https://i.imgur.com/nrdYNtL.gif`,
          `https://c.tenor.com/9e1aE_xBLCsAAAAM/anime-hug.gif`,
          `https://c.tenor.com/X5nBTYuoKpoAAAAM/anime-cheeks.gif`,
          `https://c.tenor.com/SPs0Rpt7HAcAAAAM/chiya-urara.gif`,
          `https://c.tenor.com/nHkiUCkS04gAAAAM/anime-hug-hearts.gif`,
          `https://c.tenor.com/dIvoDyyk5LIAAAAM/anime-hug-sweet.gif`,
          `https://c.tenor.com/epQeAT-abYgAAAAM/กอด.gif`,
          `https://c.tenor.com/z6wApX13fSEAAAAM/abraço-hug.gif`,
          `https://c.tenor.com/znURt9fG-KcAAAAM/anime-hug-anime-nekopara.gif`,
          `https://c.tenor.com/xhLBnoonMjMAAAAM/anime-hug.gif`,
          `https://c.tenor.com/GJ6oX6r0mZsAAAAM/chuunibyou-anime.gif`,
          `https://c.tenor.com/oDGYXy0mwYMAAAAM/loli-hug.gif`,
          `https://c.tenor.com/2tStVop0CowAAAAM/lindo-adorable.gif`,
          `https://c.tenor.com/OwBrhWnP54EAAAAC/naruto-anime.gif`,
          `https://c.tenor.com/D4HrmF302vYAAAAC/naruto-anime.gif`,
        ];

        const rand = list[Math.floor(Math.random() * list.length)];
        const user = await client.utils.getUser(args[0], message);

        if (!user) return message.reply(`**${Emojis.errado} » ${lang.commands.hug.noMention}!**`);

        message.reply({
          files: [rand],
          content: `**${Emojis.heart} » ${message.author} ${lang.commands.hug.message} ${user}!**`,
        });
      }
}
