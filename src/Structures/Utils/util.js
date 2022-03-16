const { duration } = require("moment");
const { WebhookClient } = require("discord.js");

const { promisify } = require("util")
const glob = promisify(require("glob"))
const { parse } = require('path')
const { readdirSync } = require('fs')

module.exports = {

async sendLogs(content) {
  const webhookClient = new WebhookClient({
    token: yml.logsToken,
    id: yml.logsId
  });
  webhookClient.send({
    content: String(content)
  });
},

async getUser(args, message) {
  if (!args || !message) return;

  let user;

  if(/<@!?\d{17,18}>/.test(args)) {
    user = await message.client.users.fetch(args.match(/\d{17,18}/)?.[0])

  } else {

    user = await message.guild.members.search({ query: args, limit: 1 }).then((x) => x.first()?.user);

    if(!user) user = await message.client.users.fetch(args).catch(() => {}); 
  
    }

  if(user) return user
},

 applyLineBreaks(string, maxCharLengthPerLine) {
  const split = string.split(' ');
  const chunks = [];

  for (var i = 0, j = 0; i < split.length; i++) {
    if ((chunks[j] + split[i]).length > maxCharLengthPerLine) j++;

    chunks[j] = (chunks[j] || '') + split[i] + ' ';
  }

  return chunks.map((c) => c.trim()).join(`\n`);
},

 formatTime: (time) => duration(time).format('d[d,] h[h,] m[m,] s[s,]'),

 abbreviateNumber(number, precision = 2) {
  const suffsFromZeros = {
    0: '',
    3: 'k',
    6: 'M',
    9: 'G',
    12: 'T'
  };
  const { length } = number.toString();
  const lengthThird = length % 3;
  const divDigits = length - (lengthThird || lengthThird + 3);
  const calc = `` + (number / 10 ** divDigits).toFixed(precision);

  return number < 1000 ?
    '' + number :
    (calc.indexOf('.') === calc.length - 3 ?
      calc.replace(/\.00/, '') :
      calc) + suffsFromZeros[divDigits];
},

 convertAbbreviatedNum(abbreviation) {
  const number = parseFloat(abbreviation.substr(0, abbreviation.length - 1));
  const unit = abbreviation.substr(-1);
  const zeros = {
    k: 1e3,
    M: 1e6,
    G: 1e9,
    T: 1e12
  };

  return !zeros[unit] ? parseFloat(abbreviation) : number * zeros[unit];
},

 convertMilliseconds(ms) {
  const seconds = ~~(ms / 1000);
  const minutes = ~~(seconds / 60);
  const hours = ~~(minutes / 60);
  const days = ~~(hours / 24);

  return {
    days,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
  };
},

 progressBar(current, total, barSize) {
  const progress = Math.round((barSize * current) / total);

  return ('━'.repeat(progress > 0 ? progress - 1 : progress) + '⚪' + '─'.repeat(barSize - progress));
},

 timeToMilliseconds(time) {
  const timeUnits = time
    .replace(/[\d\s]/g, (_) => '')
    .toLowerCase()
    .split('');
  const formats = ['d', 'h', 'm', 's'];

  const isValid =
    timeUnits.length === new Set(timeUnits).size &&
    timeUnits.every(
      (u, i, a) =>
      formats.includes(u) && formats.indexOf(a[i - 1]) < formats.indexOf(u)
    );
  if (!isValid) return null;

  const formatted = time
    .replace(/([a-zA-Z])/g, '$1 ')
    .toLowerCase()
    .trim()
    .split(' ')
    .filter((f) => !!f);
  if (formatted.some((e) => !/[0-9]/.test(e))) return null;

  const invalid = {
    h: 24,
    m: 60,
    s: 60
  };
  for (const f of formatted) {
    const value = f.replace(/\D/g, '');
    const unit = f.replace(/\d/gi, '');

    if (value >= invalid[unit]) return null;
  }

  const convertions = {
    d: 86_400_000,
    h: 3_600_000,
    m: 60_000,
    s: 1000
  };

  return formatted.reduce(
    (acc, curr, i, a) =>
    acc +
    parseInt(curr.substring(0, curr.length - 1)) *
    convertions[curr[curr.length - 1]],
    0
  );
},

 shorten(text, size) {
  if (typeof text !== `string`) return '';
  if (text.length <= size) return text;
  return text.substr(0, size).trim() + '...';
},

 coinflip: _ => Math.random() < 0.5,

 formatSizeUnits(bytes) {
  if (bytes >= 1073741824) {
    bytes = (bytes / 1073741824).toFixed(2) + " GB";
  } else if (bytes >= 1048576) {
    bytes = (bytes / 1048576).toFixed(2) + " MB";
  } else if (bytes >= 1024) {
    bytes = (bytes / 1024).toFixed(2) + " KB";
  } else if (bytes > 1) {
    bytes = bytes + " bytes";
  } else if (bytes == 1) {
    bytes = bytes + " byte";
  } else {
    bytes = "0 bytes";
  }
  return bytes;
},

async loadCommands(client) {
  readdirSync('./src/commands/').forEach((local) => {
    const comandos = readdirSync(`./src/commands/${local}`).filter((arquivo) => arquivo.endsWith('.js'));

    for (const file of comandos) {
      const puxar = require(`../../commands/${local}/${file}`);

      if (puxar.name) {
        client.commands.set(puxar.name, puxar);
      }
      if (puxar.aliases && Array.isArray(puxar.aliases))
        puxar.aliases.forEach((x) => client.aliases.set(x, puxar.name));
    }
  });
},

async  loadEvents(client) {
  const events = await glob(`${process.cwd()}/src/events/client/**/*.js`)
  events.forEach(eventFile => {
    delete require.cache[eventFile]
    const file = require(eventFile)
    const { name } = parse(eventFile)
    client.on(name, file.bind(null, client))
  });
},

}
