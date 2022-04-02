const { load } = require('js-yaml');
const { readFileSync } = require('fs');
global.config = load(readFileSync('./config.yml', 'utf8'));

const { connect } = require('mongoose');

connect(global.config.database, 
  { useNewUrlParser: true,
    useUnifiedTopology: true 
  }).then(() => {}).catch(console.error);

const SiestaClient = require('./Structures/SiestaClient');
const client = new SiestaClient();

client.start();

const filter = (err) => { 
  if(!['Missing Access', 'Missing Permissions'].includes(err)) console.log('\n\n'); client.logger.stack(err.stack); 
};

global.process.on('unhandledRejection', filter);
global.process.on('uncaughtException', filter);
