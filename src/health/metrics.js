'use strict'

const util = require('util')

module.exports = (send) => {

  return util.promisify((arg, opts, callback) => {
    if (typeof opts == 'function') {
      callback = opts
      opts = undefined
    }

    var monitorPath = 'monitor/metrics';
    if (arg) {
      monitorPath += '/' + arg;
    }

    send({
      path: monitorPath,
      qs: opts
    }, callback)
  })
}
