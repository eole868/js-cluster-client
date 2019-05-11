'use strict'

const promisify = require('promisify-es6')
const moduleConfig = require('./utils/module-config')

module.exports = (arg) => {
  const send = moduleConfig(arg)

  return promisify((opts, callback) => {
    if (typeof opts == 'function') {
      callback = opts
      opts = undefined
    }
    send({
      path: 'version',
      qs: opts
    }, callback)
  })
}
