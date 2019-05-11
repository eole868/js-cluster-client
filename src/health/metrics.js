'use strict'

const promisify = require('promisify-es6')

module.exports = (send) => {

  return promisify((arg, opts, callback) => {
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
