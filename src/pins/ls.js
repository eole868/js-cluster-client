'use strict'

const util = require('util')

module.exports = (send) => {
  return util.promisify((opts, callback) => {
    if (typeof opts == 'function') {
      callback = opts
      opts = undefined
    }

    var lsPath = 'pins';
    if (opts) {
      lsPath += '?filter=' + opts.filter || 'all'
      lsPath += '&local=' + opts.local || 'true' 
    }

    send({
      path: lsPath
    }, callback)
  })
}
