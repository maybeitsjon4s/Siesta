const { load } = require('js-yaml');
const { readFileSync } = require('fs');
global.config = load(readFileSync('./config.yml', 'utf8'));
const { AutoPoster } = require('topgg-autoposter');


const SiestaClient = require('./Structures/SiestaClient');
const client = new SiestaClient();

client.start();
AutoPoster(global.config.connections.topgg, client);
const filter = (err) => { 
    if(String(err).includes(['Unknown Message', 'Missing Permissions', 'Missing Acess'])) return;
    console.log('\n\n'); client.logger.stack(err.stack);
};
global.process.on('unhandledRejection', filter);
global.process.on('uncaughtException', filter);
