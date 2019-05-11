'use strict'

const promisify = require('promisify-es6')
const moduleConfig = require('./utils/module-config')

module.exports = (arg) => {
  const send = moduleConfig(arg)

  return promisify((args, opts, callback) => {
    
    if (typeof args == 'function') {
      callback = args
      args = undefined
    }

    if(typeof opts == 'function') {
      callback = opts
      if(args == 'string') {
        opts = undefined
      }
      else{
        opts = args
        args = undefined
      }
    }

    var recoverPath = 'pins/recover'

    if(args) {
      recoverPath = `pins/${args}/recover`
    }

    send({
      method: 'POST',
      path: recoverPath,
      qs: opts
    }, callback)
  })
}