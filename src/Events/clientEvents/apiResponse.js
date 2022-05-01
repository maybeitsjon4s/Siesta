const { blue, green } = require('colors');

module.exports = {
  name: 'apiResponse',
  exec: (client, req, res) => console.log(blue('[ REQUEST ]'), green(`${req.method.toUpperCase()} ${blue('|')} ${req.path} ${blue('|')} ${res.statusText}`))
};
