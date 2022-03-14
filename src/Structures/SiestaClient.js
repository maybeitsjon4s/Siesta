const { Client, Options, Collection } = require("discord.js-light")
const Music = require("../Music")

const User = require('../Models/User')
const Guild = require('../Models/Guild')

const moment = require("moment-timezone");
const momentDurationFormatSetup = require("moment-duration-format");
momentDurationFormatSetup(moment);

module.exports = class SiestaClient extends Client {
    constructor() {
        super({
            makeCache: Options.cacheWithLimits({
                ApplicationCommandManager: 0, 
                BaseGuildEmojiManager: 0,
                GuildBanManager: 0, 
                GuildInviteManager: 0, 
                GuildManager: Infinity, 
                GuildMemberManager: 0, 
                GuildStickerManager: 0, 
                GuildScheduledEventManager: 0,
                PresenceManager: 0, 
                ReactionManager: 0, 
                ReactionUserManager: 0, 
                StageInstanceManager: 0, 
                ThreadManager: 0, 
                ThreadMemberManager: 0, 
                UserManager: 0, 
            }),
            intents: [
                'GUILDS',
                'GUILD_MESSAGES',
                'GUILD_MEMBERS',
                'GUILD_VOICE_STATES',
            ],
            allowedMentions: {
                parse: ["users"]
            },
            restTimeOffset: 0,
            restWsBridgetimeout: 100,
        })

        this.commands = new Collection()
        this.aliases = new Collection()
        this.cooldowns = new Collection()

        this.utils = require('./Utils/util')
        this.owners = ["431768491759239211"]
        this.color = '#ffffff'
        this.langs = {
            pt: require('../Locales/pt-BR'),
            en: require('../Locales/en-US')
        }
        
         this.db = {
             user: User,
             guild: Guild
         }
    }


    async login() {
        await this.utils.loadCommands(this)
        await this.utils.loadEvents(this)
        await Music(this)
        await super.login(yml.token).catch(console.error)
    }
}
