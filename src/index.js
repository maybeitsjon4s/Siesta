require('colors');
const { load } = require('js-yaml');
const { readFileSync } = require('fs');
global.config = load(readFileSync('./env.yml', 'utf8'));

const { connect } = require('mongoose');

connect(global.config.database, { useNewUrlParser: true, useUnifiedTopology: true }).catch(console.error)

const SiestaClient = require('./Structures/SiestaClient');
const client = new SiestaClient();

client.start();

const filter = (err) => { 
  if(['missing access', 'missing permissions'].includes(err.toLowerCase())) console.log('\n\n' + String(err.stack).gray) 
}

process.on('unhandledRejection', filter)
process.on('uncaughtException', filter)
