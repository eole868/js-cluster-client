'use strict'

const util = require('util')
const moduleConfig = require('./utils/module-config')

module.exports = (arg) => {

  const send = moduleConfig(arg)

  return util.promisify((hash, opts, callback) => {
    if (typeof opts === 'function') {
      callback = opts
      if(typeof hash === 'string') {
        opts = undefined
      }
      else {
        opts = hash
        hash = undefined
      }
    }
    if(typeof hash === 'function') {
      callback = hash
      hash = undefined
      opts = undefined      
    }

    var allocationsPath = 'allocations'

    if(hash) {
      allocationsPath += '/' + hash
    }

    send({
      path: allocationsPath,
      qs: opts
    }, callback)
  })
}
