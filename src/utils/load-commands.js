'use strict'

function getCommands() {
  const cmds = {
    id: require('../id'),
    peers: require('../peers'),
    pin: require('../pins'),
    allocations: require('../allocations'),
    status: require('../status'),
    sync: require('../sync'),
    recover: require('../recover'),
    version: require('../version'),
    health: require('../health'),
    monitor: require('../monitor')
  }

  return cmds
}

function loadCommands(send) {
  const files = getCommands()
  const cmds = {}

  Object.keys(files).forEach((file) => {
    cmds[file] = files[file](send)
  })

  return cmds
}

module.exports = loadCommands
