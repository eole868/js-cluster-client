'use strict'

const util = require('util')

module.exports = (send) => {
  return util.promisify((filter, callback) => {
    if (typeof filter == 'function') {
      callback = filter
      filter = undefined
    }

    var filterPath = 'allocations';
    if (filter) {
      filterPath += '?filter=' + filter
    }

    send({
      path: filterPath
    }, callback)
  })
}
