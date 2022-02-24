import "dotenv/config";
import "colors";
import SiestaClient from './Structures/SiestaClient.js';

const client = new SiestaClient()

client.login()