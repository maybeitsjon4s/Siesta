import { WebhookClient } from 'discord.js';

  async function sendLogs({ content, type }) {
    switch(type) {
    case 'command':
      new WebhookClient({
        url: global.config.logs.commands
      }).send({ content });
      break;
    case 'guild':
      new WebhookClient({
        url: global.config.logs.guilds
      }).send({ content });
      break;
    }
  }

  function getUserFlags (user) {
    const flagsList = [];
    if(user.flags) {
      const flags = user.flags.toArray().join(' ')
      .replace('Partner', '<:parceiro:938035311093612544>')
      .replace('CertifiedModerator', '<:mod:938035490836344852>')
      .replace('VerifiedDeveloper', '<:dev2:938036145441374238>')
      .replace('PremiumEarlySupporter', '<:supporter:938036320721326101>')
      .replace('HypeSquadOnlineHouse3', '<:balance:938043574430347284>')
      .replace('HypeSquadOnlineHouse2', '<:briliance:938044002849128459>')
      .replace('HypeSquadOnlineHouse1', '<:bravery:938044368584056863>')
      .replace('VerifiedBot', '').
      replace('Hypesquad', '<:hypesquad:938548922954178610>')
      .replace('BugHunterLevel1', '<:bughunter1:961284995543085096>')
      .replace('BugHunterLevel2', '<:bughunter2:961285102065823794>')
      .replace('Staff', '<:employee:961285914548666368>')
      .split(' ');
      
      flags.forEach((f) => flagsList.push(f));
    }
    return flagsList.length > 0 ? flagsList.join(' ') : '';
  }

  async function getUser(args, message) {
    if (!args || !message) return;
    let user;

    if(/<@!?\d{17,18}>/.test(args)) {

      user = await message.client.users.fetch(args.match(/\d{17,18}/)?.[0]);
    } else {

      user = await message.guild.members.search({ query: args, limit: 1 }).then((x) => x.first()?.user);
      if(!user) user = await message.client.users.fetch(args).catch(() => {}); 
    }

    if(user) {
      return user;
    } else {
      return null;
    }
  }

  function applyLineBreaks(string, maxCharLengthPerLine) {
    const split = string.split(' ');
    const chunks = [];

    for (let i = 0, j = 0; i < split.length; i++) {
      if ((chunks[j] + split[i]).length > maxCharLengthPerLine) j++;

      chunks[j] = (chunks[j] || '') + split[i] + ' ';
    }

    return chunks.map((c) => c.trim()).join('\n');
  }

  function formatTime(ms) {
    let seconds = ms / 1000;
    const days = parseInt(seconds / 86400);
    seconds = seconds % 86400;
    const hours = parseInt(seconds / 3600);
    seconds = seconds % 3600;
    const minutes = parseInt(seconds / 60);
    seconds = parseInt(seconds % 60);
  
    if (days) {
      return `${days}d, ${hours}h, ${minutes}m, ${seconds}s`;
    }
    else if (hours) {
      return `${hours}h, ${minutes}m, ${seconds}s`;
    }
    else if (minutes) {
      return `${minutes}m, ${seconds}s`;
    }
    return `${seconds}s`;
  }

  function abbreviateNumber(number, precision = 2) {
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
    const calc = '' + (number / 10 ** divDigits).toFixed(precision);

    return number < 1000 ?
      '' + number :
      (calc.indexOf('.') === calc.length - 3 ?
        calc.replace(/\.00/, '') :
        calc) + suffsFromZeros[divDigits];
  }

  function convertAbbreviatedNum(abbreviation) {
    const number = parseFloat(abbreviation.substr(0, abbreviation.length - 1));
    const unit = abbreviation.substr(-1);
    const zeros = {
      k: 1e3,
      M: 1e6,
      G: 1e9,
      T: 1e12
    };

    return !zeros[unit] ? parseFloat(abbreviation) : number * zeros[unit];
  }

  function convertMilliseconds(ms) {
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
  }

  function progressBar(current, total, barSize) {
    const progress = Math.round((barSize * current) / total);

    return ('━'.repeat(progress > 0 ? progress - 1 : progress) + '⚪' + '─'.repeat(barSize - progress));
  }

  function timeToMS(time) {
    const timeUnits = time
      .replace(/[\d\s]/g, () => '')
      .toLowerCase()
      .split('');
    const formats = ['d', 'h', 'm', 's'];

    const isValid =
    timeUnits.length === new Set(timeUnits).size &&
    timeUnits.every((u, i, a) => formats.includes(u) && formats.indexOf(a[i - 1]) < formats.indexOf(u));
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
      (acc, curr) =>
        acc +
    parseInt(curr.substring(0, curr.length - 1)) *
    convertions[curr[curr.length - 1]],
      0
    );
  }

  function shorten(text, size) {
    if (typeof text !== 'string') return '';
    if (text.length <= size) return text;
    return text.substr(0, size).trim() + '...';
  }

  const coinflip = () => Math.random() < 0.5

  function formatSizeUnits(bytes) {
    if (bytes >= 1073741824) {
      bytes = (bytes / 1073741824).toFixed(2) + ' GB';
    } else if (bytes >= 1048576) {
      bytes = (bytes / 1048576).toFixed(2) + ' MB';
    } else if (bytes >= 1024) {
      bytes = (bytes / 1024).toFixed(2) + ' KB';
    } else if (bytes > 1) {
      bytes = bytes + ' bytes';
    } else if (bytes == 1) {
      bytes = bytes + ' byte';
    } else {
      bytes = '0 bytes';
    }
    return bytes;
  }

export default { 
  sendLogs, 
  getUser, 
  getUserFlags, 
  applyLineBreaks, 
  formatTime, 
  abbreviateNumber, 
  convertAbbreviatedNum, 
  convertMilliseconds, 
  progressBar, 
  timeToMS,
  shorten,
  formatSizeUnits,
  coinflip
}