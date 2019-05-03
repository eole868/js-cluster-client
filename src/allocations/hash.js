'use strict'

const util = require('util')

module.exports = (send) => {
  return util.promisify((hash, callback) => {
    if (typeof hash == 'function') {
      callback = hash
      hash = undefined
    }

    var hashPath = 'allocations';
    if (hash) {
      hashPath += '/' + hash
    }

    send({
      path: hashPath
    }, callback)
  })
}
