const { MessageEmbed, Discord } = require(`discord.js`);
const Emojis = require(`../../Structures/Utils/emojis`);
 const Guild = require("../../database/Schemas/Guild")

module.exports = {
  name: 'avatar',
  aliases: ['av'],
  run: async (client, message, args, player, lang) => {

        let user = await client.utils.getUser(args[0], message);
        if (!user) user = message.author;

        let avatar = user.displayAvatarURL({
          dynamic: true,
          format: 'png',
          size: 2048,
        });
        
        let embed = new MessageEmbed()
          .setColor(client.color)
          .setTitle(`${Emojis.star} | __Siesta__`)
          .setDescription(`${lang.commands.avatar.sucess.replace('{}', user.username).replace('{URL}', user.displayAvatarURL({ dynamic: true, size: 2048}))}**`)
          .setImage(avatar)
          .setFooter({
            text: message.author.tag,
            iconURL: message.author.displayAvatarURL({ dynamic: true }),
          })
          .setTimestamp();

        await message.reply({ embeds: [embed] });
  },
};
