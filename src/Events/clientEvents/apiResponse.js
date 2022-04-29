const { blue, green } = require('colors')

module.exports = {
  name: 'apiResponse',
  exec: (client, res, req) => console.log(blue('[ REQUEST ]'), green(`${res.method.toUpperCase()} ${res.path}`))
}
