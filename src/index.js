const { load } = require('js-yaml');
const { readFileSync } = require('fs');
const { AutoPoster } = require('topgg-autoposter');


global.config = load(readFileSync('./config.yml', 'utf8'));

const SiestaClient = require('./Structures/SiestaClient');
const client = new SiestaClient();
client.start();

AutoPoster(global.config.connections.topgg, client);

// Handling some errors
const callback = (error) => {
  if(error.toString().includes('Missing Permissions') || error.toString().includes('Missing acess')) return;
  console.log('\n\n'); client.logger.stack(error.stack);
};

global.process.on('unhandledRejection', callback);
global.process.on('uncaughtException', callback);
