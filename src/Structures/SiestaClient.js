const { Client, Options, Collection } = require('discord.js-light')
const Music = require('./Music')

const User = require('../Models/User')
const Guild = require('../Models/Guild')

const { extend } = require("dayjs")
require('dayjs/locale/pt')
require('dayjs/locale/en')
const relativeTime = require('dayjs/plugin/relativeTime')
extend(relativeTime)

module.exports = class SiestaClient extends Client {
    constructor() {
        super({
            makeCache: Options.cacheWithLimits({
        ApplicationCommandManager: 0, // guild.commands
        BaseGuildEmojiManager: 0, // guild.emojis
        GuildBanManager: 0, // guild.bans
        GuildInviteManager: 0, // guild.invites
        GuildManager: Infinity, // client.guilds
        GuildMemberManager: 0, // guild.members
        GuildStickerManager: 0, // guild.stickers
        GuildScheduledEventManager: 0, // guild.scheduledEvents
        MessageManager: 0, // channel.messages
        PresenceManager: 0, // guild.presences
        ReactionManager: 0, // message.reactions
        ReactionUserManager: 0, // reaction.users
        StageInstanceManager: 0, // guild.stageInstances
        ThreadManager: 0, // channel.threads
        ThreadMemberManager: 0, // threadchannel.members
        UserManager: 0, // client.users
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
        })

        this.commands = new Collection()
        this.aliases = new Collection()

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


    async start() {
        await this.utils.loadCommands(this)
        await this.utils.loadEvents(this)
        await Music(this)
        await super.login(global.config.token).catch(console.error)
    }
}
