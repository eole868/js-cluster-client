'use strict'

const promisify = require('promisify-es6')

module.exports = (send) => {
  return promisify((arg, opts, callback) => {
    if (typeof opts == 'function') {
      callback = opts
      opts = undefined
    }

    var rmPath = `pins/${arg}`

    send({
      path: rmPath,
      method: 'DELETE',
      qs: opts
    }, callback)
  })
}
