const yaml = require('js-yaml')
const { readFileSync } = require('fs')
const config = yaml.load(readFileSync('./env.yml', 'utf8'))
const { ShardingManager } = require('discord.js-light')

const manager = new ShardingManager('./src/index.js', {
    token: config.token,
    totalShards: 2,
    respawn: true
  })
  
manager.spawn()
