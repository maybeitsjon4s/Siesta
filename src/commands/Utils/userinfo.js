import { MessageEmbed } from "discord.js";
import { star, user as _user, estrela, heart2, boost } from `../../Structures/Utils/emojis`;
import { locale, utc } from 'moment';

export const name = `userinfo`;
export const category = `utils`;
export const aliases = [`ui`, "whois"];
export async function run(client, message, args, player, lang) {
  locale(lang.name);

  export default {
    name: "userinfo",
    category: "utils",
    aliases: ["ui", "whois"],
    run: async (client, message, args, player, lang) => {
      locale(lang.name)


      let user = await client.utils.getUser(args[0], message);

      if (!user)
        user = message.author;

      const embed = new MessageEmbed()
        .setTitle(`${star} | __Siesta__`)
        .setColor(client.color)
        .addField(`${_user} » User`, ` \`${user.tag}\``, true)
        .addField(`${estrela} » ${lang.commands.userinfo.createdAccount}`, `\`${utc(user.createdAt).format(`DD/MM/YYYY`)}\` \`(${moment(user.createdAt).fromNow()})\``, true)
        .addField(`<:members:867005290859462676> » Id`, `\`${user.id}\``, true)
        .setFooter({
          text: message.author.tag,
          iconURL: message.author.displayAvatarURL({ dynamic: true }),
        })
        .setTimestamp();

      if (message.guild.members.cache.get(user.id)) {
        let member = message.guild.members.cache.get(user.id);

        embed.addField(`${heart2} » ${lang.commands.userinfo.joinedAt}`, `\`${utc(member.joinedAt).format(`DD/MM/YYYY`)}\` \`(${moment(member.joinedAt).fromNow()})\``, true);

        if (member.premiumSince)
          embed.addField(`${boost} » ${lang.commands.userinfo.boosterSince}`, `\`${utc(member.premiumSince).format("DD/MM/YYYY")} \`\`(${utc(member.premiumSince).fromNow()})\``, true);
      }

      message.reply({ embeds: [embed] });
    }
  }
}