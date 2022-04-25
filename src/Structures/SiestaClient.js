const { Client, Options, Collection } = require('discord.js-light');
const { gray, green, red } = require('colors');
const { Guild, User } = require('../Models/index.js');
const { extend } = require('dayjs');
require('dayjs/locale/pt');
require('dayjs/locale/en');
const relativeTime = require('dayjs/plugin/relativeTime');
extend(relativeTime);
const { promisify } = require('util');
const glob = promisify(require('glob'));
const LocaleManager = require('./LocaleManager.js');
const Music = require('./Music.js');
module.exports = class Siesta extends Client {
    constructor() {
        super({
            makeCache: Options.cacheWithLimits({
                ApplicationCommandManager: 0,
                BaseGuildEmojiManager: 0,
                GuildBanManager: 0,
                GuildInviteManager: 0,
                GuildManager: Infinity,
                GuildMemberManager: Infinity,
                GuildStickerManager: 0,
                GuildScheduledEventManager: 0, 
                MessageManager: 0,
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
                parse: ['users']
            },
            shardCount: 2,
            failIfNotExists: false,
            
        });

        this.commands = new Collection();
        this.aliases = new Collection();
        this.utils = require('./Utils/util');
        this.owners = ['431768491759239211'];
        this.color = '#ffffff';
        this.localeManager = new LocaleManager(this);
        this.db = {
            user: User,
            guild: Guild
        };
        this.logger = {
            sucess: (text) => console.log(green(text)),
            error: (text) => console.log('\n' + red(text)),
            stack: (text) => console.log(gray(String(text))),
        };
    }
    async start() {
        this.loadEvents();
        this.loadCommands();
        this.localeManager.loadLocales();
        this.music = new Music(this);
        await super.login(global.config.token);
    }
    async loadCommands() {
        await glob(`${global.process.cwd()}/src/Commands/**/*js`, async (err, filePaths) => {
            if (err) return console.log(err);
            filePaths.forEach((file) => {
                const pull = require(file);
                if (pull.name) this.commands.set(pull.name, pull);
                if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach((alias) => this.aliases.set(alias, pull.name));
            });
        });
    }
  
    async loadEvents() {
        const events = await glob(`${global.process.cwd()}/src/Events/**/*.js`);
        events.forEach((eventFile) => {
            const file = require(eventFile);
            super.on(file.name, file.exec.bind(null, this));
        });
    }
    async loadSlashCommands() {
        const slashCommands = await glob(`${global.process.cwd()}/src/Commands/*/*.js`);

        const arrayOfSlashCommands = [];
  
        slashCommands.map((value) => {
            const file = require(value);
  
            if(!file?.name || !file.description ||!file.options) return;
  
            arrayOfSlashCommands.push(file);
        });
  
        await this.application.commands.set(arrayOfSlashCommands);
    }
};
