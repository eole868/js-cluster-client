'use strict'

const promisify = require('promisify-es6')

module.exports = (send) => {
  return promisify((arg, opts, callback) => {
    if (typeof opts == 'function') {
      callback = opts
      opts = undefined
    }

    var peerAddBody = {
      "peer_id": arg
    }

    send({
      path: 'peers',
      method: 'POST',
      data: JSON.stringify(peerAddBody),
      qs: opts
    }, callback)
  })
}
