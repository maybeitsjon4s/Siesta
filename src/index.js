import { load } from 'js-yaml';
import { readFileSync } from 'node:fs';
import { AutoPoster } from 'topgg-autoposter';
global.config = load(readFileSync('./config.yml', 'utf8'));
import SiestaClient from './Structures/SiestaClient.js';

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

export default client;
