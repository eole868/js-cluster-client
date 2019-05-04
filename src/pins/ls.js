'use strict'

const util = require('util')

module.exports = (send) => {
  return util.promisify((arg, opts, callback) => {
    if (typeof arg === 'function') {
      callback = arg
      arg = undefined
      opts = undefined
    }
    
    if (typeof opts === 'function') {
      callback = opts
      if(typeof arg === 'string') {
        opts = undefined
      }
      else{
        opts = arg
        arg = undefined
      }
    }

    var lsPath = 'pins';

    if(arg) {
      lsPath += `/${arg}`
    }

    /* if (opts) {
      lsPath += '?filter=' + opts.filter || 'all'
      lsPath += '&local=' + opts.local || 'true' 
    } */

    send({
      path: lsPath,
      qs: opts
    }, callback)
  })
}
