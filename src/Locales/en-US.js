module.exports = {
    name: "en-US",
    events: {
        messageCreate: {
            mention: "Hi, I'm **Siesta**! My prefix on this server is **{}** if you want to know my commands use **{}help**!",
            error: "There was an error using the command {}, if you can go to the bot support server using the button below and report it to be fixed as soon as possible!",
            cooldown: "Wait \`{}\` seconds to run a command again!"
        },
        autoModEvents: {
            antiinvite: "You cannot send server links here!"
        },
        musicEvents: {
          trackStart: "Now playing: \`{track}\`, requested by \`{user}\`",
          trackStuck: "Music got stuck so I'll skip it...",
          queueEnd: "Music is over I'm leaving the channel..."
        }
    },
    commands: {
        antiinvite: {
            errorPerm: "You need \`Manage Server\` permission to run this command!",
            firstField: {
                title: "What is Anti-invite?",
                value: "Anti-invite is one of my automatic moderation modules, when someone sends an invitation link to a server other than this one and if that person doesn't have any moderator permissions, this message will be deleted."
            },
            secondField: {
              title: "And how do I configure it?",
              value: "To configure the anti-invite module is very simple, just insert one of these options after the command: \n> \`activate\` » Activate the module\n> \`deactivate\` » Deactivate the module\n**But like me do i set up a channel where invites will be ignored? Just use one of the whitelist options below:**\n> \`whitelist add\` » Add a channel to the list of channels that the bot will ignore invites\n> \`whitelist remove\` » Remove a channel from the list of channels the bot ignores"
            },
            enabled: "Anti-invitation module successfully activated!",
            disabled: "Anti-invitation module successfully deactivated!",
            errorWhitleList: "You need to put what you want to do inside the whitelist subcommand\n> \`whitelist add\` » Add a channel to the blocked channel list\n> \`whitelist remove\ » Remove a channel from the blocked channel list",
            channelAltereadySet: "This channel is already on the whitelist",
            addedChannel: "I successfully added the channel to the ignored channel list!",
            removeError: "This channel is not on my whitelist so you can't block it!",
            removed: "I successfully removed the channel from the ignored channel list!",
        },
        language: {
            errorPerm: "You need \`Manage Server\` permission to run this command!",
            message: "I see that you want to change the language I use here!**\n> **To change it, just use the buttons in this message!**\n\n> 🇵🇹 Portuguese » 100%\n> 🇺🇸 English » 100%\n\n> \`The translations may not be 100% correct, if you find any problems with them, please report it to my team!\`",
            onlyAuthor: "You cannot use these buttons",
            portugueseSeted: "Portugues setado com sucesso!",
            englishSeted: "English set successfully",
        },
        prefix: {
            errorPerm: "You need \`Manage Server\` permission to run this command!",
            noPrefix: "You need to enter the new prefix!",
            sevenLenght: "The prefix cannot contain more than 7 characters!",
            seted: "New prefix successfully set!",
        },
        welcome: {
            errorPerm: "You need \`Manage Server\` permission to run this command!",
            argsError: "You didn't use the command correctly use \`<welcome on/off [channel] [incoming message]\` if you want to know some placeholders check out this short list: \n \`{guild}\` - Displays the name of the server. \n \`{member}\` - Mention the user who entered \n \`{membertag}\` - Display the name and tag of the user.\n \`{count}\` - Display the number of members of the server.",
            seted: "Welcome system successfully configured!",
            disabled: "Welcome system successfully deactivated!"
        },
        atm: {
            neverUsedTheBot: "This user has never used me so he has __0__ diamonds!",
            message: "Currently {user} has **{value}** diamond(s)"
        },
        coinflip: {
            noValue: "Please enter the bet amount!",
            dontHave: "You don't have that diamond(s)!",
            invalidValue: "You have to place a value greater than \`0\` to place the bet!",
            win: "Tails!! You won",
            lose: "Crown!! You lost"
        },
        cooldowns: {
            canUse: "You can now use the command again!",
        },
        daily: {
            cooldown: "Try again at",
            won: "won in your daily \`{amount}\` diamonds!"
        },
        mine: {
            noPickaxe: "You need a pickaxe to mine!",
            noEmeralds: "You don't have any emeralds!",
            sold: "You sold \`{emeralds}\` emeralds for \`value\` diamonds!",
            maxLevel: "Your pickaxe is already at maximum level \`(6)\`",
            needMoreExp: "You still don't have enough experience to level up your pickaxe",
            up: "You have successfully leveled up!",
            help: "**mine up** » Raises your level so you can see emeralds more expensively;\n" +
                "**mine** » You mine to try to earn as many emeralds as possible;\n" +
                "**mine sell** » Sell all your emeralds;\n" +
                "**mine info** » Show your info about xp, emeralds and level!",
            emeralds: "Emeralds",
            level: "Level",
            exp: "Exp",
            cooldown: "Try again in",
            mined: "you mined and got \`{amount}\` emeralds and \`100\` experience!"
        },
        pay: {
            noMention: "You have to mention someone to pay!",
            payYourSelf: "You can't pay yourself!",
            validValue: "Enter a valid amount for payment!",
            noDiamonds: "You don't have enough diamonds to make the payment!",
            neverUsed: "This user has never used me so you can't pay him!",
            payed: "you paid {user} with \`{value}\` diamonds!",
        },
        shop: {
            embed: "**Purchases: \n> {Emojis.picareta} » Buy Pickaxe: 50,000 {Emojis.dima} \n> {Emojis.vip} » Buy Vip: 250,000 {Emojis.dima} \nStatus: **\n> ** » Pickaxe:** {picaxe}**/1** \n> **» VIP:** {vip}**/1**",
            pickaxe: "Pickaxe",
            menuLabel: "Click here",
            onlyAuthor: "Only the message author can use the menu!",
            noDiamonds: "You don't have enough diamonds!",
            havePickaxe: "You already have a pickaxe!",
            buyedPickaxe: "You have successfully purchased a pickaxe!",
            haveVip: "You already have VIP!",
            buyedVip: "You have successfully purchased VIP!"
        },
        work: {
            cooldown: "Try again at",
            sucess: "worked and earned {} diamonds"
        },
        vip: {
            info: ['Benefits', '**»** Double diamonds on **daily and work ** \n **»** Exclusive position on [Siesta Server](https://discord.gg/BRQccw7HhZ)\n**»** Know Siesta news before anyone else!'],
            price: ['Price', '**»** It costs 250,000 diamonds for more information use the shop command!']
        },
        ban: {
            myPermission: "I need \`Ban Members\` permission for this command",
            userPermission: "You need \`Ban Members\` permission for this command",
            noMention: "You need to mention someone or give me an id",
            invalidUser: "Could not find this user",
            banned: "This User has already been banned from the server",
            targetYourSelf: "You can't ban yourself",
            maxLength: "Your reason cannot exceed 1000 characters",
            user: "User",
            reason: "Reason",
            invalidReason: "No Reason provided",
            higherRole: "The member's role is higher than yours or the same",
            higherRoleThanMine: "The member's role is greater than mine or the same"
        },
        clear: {
            myPermission: "I need the \`Manage messages\` permission",
            userPermission: "You need \`Manage messages\` permission",
            invalidCount: "Provide a number of up to \`99 messages\` to be deleted",
            finalMessage: "Cleaned \`{}\` messages!"
        },
        kick: {
            userPermission: "You need \`Kick Members\` permission to run this command",
            myPermission: "I need \`Kick Members\` permission to run this command",
            noMention: "Mention the user you want to kick out!",
            notFound: "User not found!",
            higherRole: "His role is higher than yours or the same!",
            higherRoleThanMine: "His role is higher than mine!",
            user: "User",
            reason: "Reason",
            noReason: "Not specified"
        },
        lock: {
            userPermission: "I don't have the \`Manage Channels\` Permission",
            myPermission: "You do not have the \`Manage Channels\` Permission",
            sucess: "Chat successfully locked!"
        },
        mute: {
            userPermission: "You need \`Moderate Members\` permission to run this command!",
            myPermission: "I need \`Moderate Members\` permission to run this command!",
            noArgs: "Mention Someone!",
            notFound: "User not found!",
            noTime: "You forgot to specify the time!",
            muteYourSelf: "You can't punish yourself!",
            punishMe: "You can't punish me!",
            higherRole: "His role is higher than yours or the same!",
            higherRoleThanMine: "His role is higher than mine!",
            invalidTime: "Please enter a valid time!",
            higherThan28Days: "Time cannot be over 28 days or the same!",
            user: "User Punished",
            reason: "Reason",
            during: "During"
        },
        unlock: {
            userPermission: "I do not have the \`Manage Channels\` Permission.",
            myPermission: "You do not have the \`Manage Channels\` Permission.",
            sucess: "Chat successfully unlocked!"
        },
        disconnect: {
            noPlayer: "I'm not playing music on this server.",
            channelError: "You are not on a voice channel or you are not on the same channel as me",
            sucess: "I disconnected from the voice channel successfully"
        },
        loop: {
            noPlayer: "I'm not playing music on this server!",
            channelError: "You need to be on a voice channel!",
            channelError2: "You're not on the same voice channel as me!",
            trackSucess: "the repetition of the Current Music!",
            queueSucess: "the repeat of the queue!",
            enable: "activated",
            disable: "I disabled"
        },
       filters: {
            noPlayer: "I'm not playing music on this server!",
            channelError: "You need to be on a voice channel!",
            onlyAuthor: "Only Message author can interact!",
            channelError2: "You're not on the same voice channel as me!",
            firstMessage: "You can activate/deactivate filters using the message below!",
            changedMessage: "I cleared all filters and added filter {}!",
            clearFiltersMessage: "Removed all the filters!",
            clearLabel: "Clear Filters"
       },
        nowplaying: {
            noPlayer: "I'm not playing music on this server!",
            info: "Informations",
            name: "Name",
            duration: "Duration",
            enabled: "Enabled",
            disabled: "Disabled",
            playing: "Playing",
            paused: "Paused"
        },
        pause: {
            noPlayer: "I'm not playing music on this server.",
            channelError: "You're not on a voice channel or you're not on the same channel as me",
            alteradyPause: "Music is currently paused!",
            sucess: "Music successfully paused!"
        },
        play: {
            wrongVoiceChannel: "You need to be on the same voice channel as me.",
            noVoiceChannel: "You need to be on a voice channel.",
            noArgs: "You need to put a song or url for me to play!",
            failedToPlay: "I couldn't play this song",
            noMatches: "I didn't find this song",
            playListLoaded: "Playlist \`{name}\` with \`{length}\` songs added to the queue and {time} of duration.",
            musicLoaded: "Music \`{}\` added to the queue"
        },
        queue: {
            noPlayer: "I'm not playing music on this server.",
            page: "Page",
            current: "Current",
            noTracks: "no tracks in",
            queue: "in the queue"
        },
        resume: {
            noPlayer: "I'm not playing music on this server.",
            channelError: "You are not on a voice channel or you are not on the same channel as me",
            alteradyPause: "Music is currently not paused!",
            sucess: "Music resumed successfully!"
        },
        seek: {
            noPlayer: "I'm not playing music on this server.",
            channelError: "You are not on a voice channel or you are not on the same channel as me",
            invalidTime: "Enter the time for me to jump and let it be valid.",
            goingTo: "Advancing to",
            backingTo: "rewinding to",
            exceeds: "This time exceeds the time of the song",
        },
        skip: {
            noPlayer: "I'm not playing music on this server.",
            channelError: "You are not on a voice channel or you are not on the same channel as me",
            sucess: "Music skiped!"
        },
        volume: {
            noPlayer: "I'm not playing music on this server.",
            channelError: "You are not on a voice channel or you are not on the same channel as me",
            bettewnOneAnd500: "Volume must be between 1 to 500",
            sucess: "Volume changed to"
        },
        skipto: {
          noPlayer: "I'm not playing music on this server.",
          channelError: "You are not on a voice channel or you are not on the same channel as me.",
          invalidPosition: 'The position you gave me its invalid.',
          sucess: 'Skiped to the music number {}!',
        },
        about: {
            noArgs: "Insert something to put in the about me",
            sucess: "About me successfully changed!"
        },
        avatar: {
            sucess: "{} Avatar **Click [here]({URL}) to download the image!"
        },
            help: {
        moderation: "Moderation",
        config: "Configs",
        economy: "Economy",
        utils: "Utils/Info",
        music: "Music",
        inviteMe: "Invite Me",
        support: "Support Server",
        message: "these are all my commands, currently i have {} commands!"
    },
    hug: {
        noMention: "Mention someone to hug",
        message: "hugged",
    },
    kiss: {
        noMention: "Mention someone to kiss",
        message: "kissed",
    },
    slap: {
        noMention: "Mention someone to slap",
        message: "slaped",
    },
    invite: {
        buttonLabel: "Click here",
        message: "You can add me to your server using the button below",
    },
    profile: {
        noDocument: "This user has never used a command of mine so he doesn't have a profile!",
        defaultAboutMe: "Use {}about to change this message!"
    },
    serverinfo: {
        name: "Name",
        owner: "Owner",
        channels: "Channels",
        text: "Text",
        voice: "Voice",
        category: "Category",
        createdAt: "Created at"
    },
    stats: {
        message: "my name is Siesta and I'm the multifunctional bot made to help your server and entertain your members with various utilities from music to moderation",
        stats: "Statistics",
        inviteMe: "Add me",
        createdBy: "I was created by"
    },
    userinfo: {
        createdAccount: "Created the account",
        joinedAt: "Joined at",
        boosterSince: "Booster Since"
    },
    vote: {
        message: "You can vote for me using the button below!",
        label: "Click here"
    }
    }
}
