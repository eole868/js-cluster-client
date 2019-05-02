'use strict'

const util = require('util')
const moduleConfig = require('./utils/module-config')

module.exports = (arg) => {
  const send = moduleConfig(arg)

  return util.promisify((arg, opts, callback) => {
    if (typeof opts == 'function') {
      callback = opts
      opts = undefined
    }

    var monitorPath = 'monitor/metrics/';
    if (arg) {
      monitorPath += '/' + arg;
    }

    send({
      path: monitorPath,
      args: opts
    }, callback)
  })
}
