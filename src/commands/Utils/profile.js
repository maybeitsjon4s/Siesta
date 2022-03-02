const { MessageAttachment } = require(`discord.js`);

const Emojis = require(`../../Structures/Utils/emojis`);

const { loadImage, registerFont, createCanvas } = require("canvas");
const { fillTextWithTwemoji } = require('node-canvas-with-twemoji-and-discord-emoji');
registerFont("src/Assets/Fonts/seguibl.ttf", {
    family: "Segoe UI Black"
});

module.exports = {
    name: "profile",
    aliases: ["pr", "perfil"],
    cooldown: 5,
    ownerOnly: false,
    run: async (client, message, args, player, lang) => {

        const GUILD = await client.db.guild.findOne({
            _id: message.guild.id
        })

        let USER = await client.utils.getUser(args[0], message)
        if (!USER) USER = message.author

        let list;

        if(USER.flags){
            list = USER.flags.toArray().join(" ")
            .replace("Partner", "<:parceiro:938035311093612544>")
            .replace("CertifiedModerator", "<:mod:938035490836344852>")
            .replace("VerifiedDeveloper", "<:dev2:938036145441374238>")
            .replace("PremiumEarlySupporter", "<:supporter:938036320721326101>")
            .replace("HypeSquadOnlineHouse3", "<:balance:938043574430347284>")
            .replace("HypeSquadOnlineHouse2", "<:briliance:938044002849128459>")
            .replace("HypeSquadOnlineHouse1", "<:bravery:938044368584056863>")
            .replace("VerifiedBot", "")
            .replace("Hypesquad", "<:hypesquad:938548922954178610>")
        } 

        const user = await client.db.user.findOne({
            _id: USER.id
        })

            if (!user) return message.reply({
                content: `**${Emojis.errado} » ${lang.commands.profile.noDocument}!**`
            })

            const canvas = createCanvas(800, 500);
            const ctx = canvas.getContext("2d");
            const avatar = await loadImage(USER.displayAvatarURL({
                extension: "jpeg",
                size: 2048
            }));
            ctx.drawImage(avatar, 51, 161, 195, 180);
            const back = await loadImage('./src/Assets/Images/Profile.png')

            ctx.drawImage(back, 0, 0, 800, 500)

            ctx.textAlign = "left"
            ctx.font = '50px "Segoe UI Black"'
            ctx.fillStyle = '#ffffff'
            await fillTextWithTwemoji(ctx, USER.username.trim(), 251, 240)
            const w = ctx.measureText(USER.username.trim()).width;

            ctx.font = '23px "Segoe UI Black"';
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "left";
            ctx.fillText(`#${USER.discriminator}`, 251 + 2 + w, 240)

            ctx.font = '30px "Segoe UI Black"'
            await fillTextWithTwemoji(ctx, list, 251, 280)

            ctx.font = '17px "Segoe UI Black"'
            await fillTextWithTwemoji(ctx, Emojis.dima + client.utils.abbreviateNumber(user.money), 2, 20)

            ctx.font = '21px "Segoe UI Black"'
            ctx.fillText(`Sobre mim:\n${client.utils.applyLineBreaks(client.utils.shorten(user.about, 180), 70) || lang.commands.profile.defaultAboutMe.replace('{}', GUILD.prefix)}`, 50, 402)

            const attach = new MessageAttachment(canvas.toBuffer(), 'Profile.png');

            message.reply({
                files: [attach]
            });
        }
        }
