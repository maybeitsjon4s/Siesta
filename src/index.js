require('colors');
const yaml = require('js-yaml');
const { readFileSync } = require('fs');
global.config = yaml.load(readFileSync('./env.yml', 'utf8'));

const { connect } = require('mongoose')

connect(globa.config.database, { useNewUrlParser: true, useUnifiedTopology: true }).catch(console.error)

const SiestaClient = require('./Structures/SiestaClient');
const client = new SiestaClient();

client.start();

const filter = (err) => { 
  if(!err.toString().toLowerCase().includes('missing permissions') || !err.toString().toLowerCase().includes('missing acess')) console.log(String(err.stack).gray) 
}

process.on('unhandledRejection', filter)
process.on('uncaughtException', filter)
