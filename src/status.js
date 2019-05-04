'use strict'

const util = require('util')
const moduleConfig = require('./utils/module-config')

module.exports = (arg) => {
  const send = moduleConfig(arg)

  return util.promisify((cid, opts, callback) => {
    if (typeof cid === 'function') {
      callback = cid
      cid = undefined
      opts = undefined
    }
    if (typeof opts === 'function') {
      callback = opts
      if(typeof cid === 'string') {
        opts = undefined
      }
      else {
        opts = cid
        cid = undefined
      }
    }

    var statusPath = 'pins';
    if (cid) {
      statusPath += '/' + cid;
    }

    send({
      path: statusPath,
      qs: opts
    }, callback)
  })
}
