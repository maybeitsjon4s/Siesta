const { load } = require('js-yaml');
const { readFileSync } = require('fs');
global.config = load(readFileSync('./config.yml', 'utf8'));
const { connect } = require('mongoose');
const { AutoPoster } = require('topgg-autoposter');

connect(global.config.connections.database).catch(console.error);

const SiestaClient = require('./Structures/SiestaClient');
const client = new SiestaClient();

client.start();
AutoPoster(global.config.connections.topgg, client);
const filter = (err) => { 
    if(!['Missing Access', 'Missing Permissions'].includes(err)) console.log('\n\n'); client.logger.stack(err.stack); 
};
global.process.on('unhandledRejection', filter);
global.process.on('uncaughtException', filter);
