'use strict'

const moduleConfig = require('../utils/module-config')

module.exports = (arg) => {
  const send = moduleConfig(arg)

  return {
    filter: require('./filter')(send),
    hash: require('./hash')(send)
  }
}
