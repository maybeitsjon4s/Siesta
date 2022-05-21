import { Client, Options, Collection } from 'discord.js';
import _pkg from 'chalk';
const { blue, gray, green, red } = _pkg;
import pkg from 'mongoose';
const { connect } = pkg;
import { Guild, User } from '../Models/index.js';
import { promisify } from 'util';
import g from 'glob';
const glob = promisify(g);
import Emojis from './Utils/emojis.js';
import LocaleManager from './LocaleManager.js';
import Music from './Music.js';
import util from './Utils/util.js';

export default class Siesta extends Client {
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
        parse: ['users'],
        repliedUser: false
      },
      ws: { properties: { $browser: 'Discord iOS' }},
      shardCount: 2
    });

    this.emj = Emojis;
    this.commands = new Collection();
    this.aliases = new Collection();
    this.utils = util;
    this.owners = ['431768491759239211', '499356551535001610'];
    this.color = '#ffffff';
    this.db = {
      user: User,
      guild: Guild
    };
    this.logger = {
      sucess: (type, text) => console.log(`${blue('[ ' + type + ' ]')} › ${green(text)}`),
      error: (text) => console.log(`${red(text)}`),
      stack: (text) => console.log(gray(String(text.toString()))),
    };
  }
  async start() {
    // Loads Everything
    this.loadEvents();
    this.loadCommands();
    this.localeManager = new LocaleManager(this);
    this.localeManager.loadLocales();
    this.music = new Music(this);

    // Connecting to the database
    connect(global.config.connections.database).catch(() => {});

    // Login the client
    await super.login(global.config.token);
  }
  async loadCommands() {
    await glob(`${global.process.cwd()}/src/Commands/**/*js`, async (err, filePaths) => {
      if (err) return console.log(err);
      filePaths.forEach(async (file) => {
        const pull = await import(file);
        const { name, aliases } = pull.default;
        if (name) this.commands.set(name, pull.default);
        if (aliases && Array.isArray(aliases)) {
          aliases.forEach((alias) => this.aliases.set(alias, name));
        }
      });
    });
  }
  
  async loadEvents() {
    const events = await glob(`${global.process.cwd()}/src/Events/**/*.js`);
    events.forEach(async (eventFile) => {
      const file = await import(eventFile);
      const { name, exec } = file.default;
      super.on(name, exec.bind(null, this));
    });
  }
  async loadSlashCommands() {
    const slashCommands = await glob(`${global.process.cwd()}/src/Commands/*/*.js`);

    const arrayOfSlashCommands = [];
  
    slashCommands.map(async (value) => {
      const file = await import(value);
  
      if(!file?.name || !file.description ||!file.options) return;
  
      arrayOfSlashCommands.push(file);
    });
  
    await this.application.commands.set(arrayOfSlashCommands);
  }
}
