import { MessageActionRow, MessageButton } from `discord.js`;
import { star, botlist } from `../../Structures/Utils/emojis`;


export default {
  name: "vote",
  run: async (client, message, args, player, lang) => {

    message.reply({
      content: `**${star} » ${lang.commands.vote.message}!**`,
      components: [
        new MessageActionRow().addComponents(
          new MessageButton()
            .setStyle(`LINK`)
            .setEmoji(botlist)
            .setLabel(lang.commands.vote.label)
            .setURL("https://top.gg/bot/907747074118926347/vote")
        ),
      ],
    });
  }
}