import { Client, Options, Collection } from "discord.js"
import Music from "../Music/index.js"
import { start } from "../database/index.js"
import moment from "moment-timezone"
import momentDurationFormatSetup from "moment-duration-format"
import Utils from "./Utils/util.js"

import ptBR from "../Locales/pt-BR.js"
import enUS from "../Locales/en-US.js"

momentDurationFormatSetup(moment)

export default class extends Client {
    constructor(options = {}) {
        super({
            makeCache: Options.cacheWithLimits({
                GuildManager: Infinity,
                GuildBanManager: 0,
                GuildScheduledEventManager: 0,
                GuildStickerManager: 0,
                ThreadMemberManager: 0,
                BaseGuildEmojiManager: 0,
                GuildInviteManager: 0,
                PresenceManager: 0,
                ReactionManager: 0,
                UserManager: 0,
            }),
            intents: [
                "GUILDS",
                "GUILD_MESSAGES",
                "GUILD_VOICE_STATES",
                "GUILD_MEMBERS",
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

        this.utils = Utils

        this.owners = ["431768491759239211"]

        this.color = '#ffffff'

        this.langs = {
            pt: ptBR,
            en: enUS
        }
    }


    async login(token = process.env.TOKEN) {
        await this.utils.loadCommands(this)
        await this.utils.loadEvents(this)
        await Music(this)
        start()
        await super.login(token).catch(console.log)
    }
}
