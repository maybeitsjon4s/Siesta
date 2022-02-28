const yaml = require('js-yaml');
const { readFileSync } = require('fs');

yml = yaml.load(readFileSync('./env.yml', 'utf8'));

const { ShardingManager } = require("discord.js"),
  manager = new ShardingManager('./src/index.js', {
    token: yml.token,
    totalShards: 2,
    respawn: true,
  });

manager.spawn();
