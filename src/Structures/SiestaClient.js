import { Client, GatewayIntentBits, Options, Collection, Colors } from 'discord.js';
import chalk from 'chalk';
const { blue, gray, green, red } = chalk;
import pkg from 'mongoose';
const { connect } = pkg;
import { Guild, User } from '../Models/index.js';
import { promisify, inspect } from 'util';
import g from 'glob';
const glob = promisify(g);
import Emojis from './Utils/emojis.js';
import LocaleManager from './LocaleManager.js';
import Music from './Music.js';
import util from './Utils/util.js';
import { createLogger, format } from 'winston'

import pkg_ from 'winston/lib/winston/transports/index.js';
const { Console } = pkg_;

const logger = createLogger({
  handleExceptions: true,
  handleRejections: true,
  exitOnError: false,
})

logger.add(
  new Console({
    level: "silly",
    format: format.combine(
      format.timestamp(),
      format.colorize(),
      format.printf((info) => {
        const levelPrefix =
          info.level.includes("info") || info.level.includes("warn")
            ? `${info.level} `
            : info.level;
        const tagsPrefix =
          info.tags && info.tags.length > 0
            ? ` --- [${info.tags
                .map((t) => blue(t))
                .join(", ")}]:`
            : " --- ";
        const message =
          (info.message) instanceof Error ||
          typeof info.message === "object"
            ? inspect(info.message, { depth: 0 })
            : green(String(info.message));
        return `${blue(info.timestamp)} ${levelPrefix} ${process.pid}${tagsPrefix} ${message}`;
      })
    ),
  })
);

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
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
      ],
      allowedMentions: {
        parse: ['users'],
        repliedUser: false
      },
      ws: { properties: { browser: 'Discord iOS' } },
      shardCount: 2
    });

    this.emotes = Emojis;
    this.commands = new Collection();
    this.aliases = new Collection();
    this.utils = util;
    this.owners = ['431768491759239211', '499356551535001610'];
    this.color = Colors.DarkGrey;
    this.db = {
      user: User,
      guild: Guild
    };
    this.logger = logger;
  }
  async start() {
    // Loads Everything
    this.loadEvents();
    this.logger.info('Events Loadesd', { tags: ['Events', 'Client']})
    this.loadCommands();
    this.logger.info('Commands Loadesd', { tags: ['Commands', 'Client']})
    this.localeManager = new LocaleManager(this);
    this.localeManager.loadLocales();
    this.logger.info('Locales Loaded', { tags: ['Locales', 'i18next']})
    this.music = new Music(this);

    // Connecting to the database
    connect(global.config.connections.database)
    .then(() => this.logger.info('Database Connected', { tags: ['Database']}))
    .catch((err) => this.logger.warn(err, { tags: ['Database']}));

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

      if (!file?.name || !file.description || !file.options) return;

      arrayOfSlashCommands.push(file);
    });

    await this.application.commands.set(arrayOfSlashCommands);
  }
}
