'use strict'

const isNode = require('detect-node')
const flatmap = require('flatmap')

function loadPaths (opts, prefix, dir) {
  const path = require('path')
  const fs = require('fs')
  const glob = require('glob')

  const followSymlinks = dir.followSymlinks != null ? dir.followSymlinks : true

  let file = path.resolve(dir.path)
  const stats = fs.statSync(file)
  if(!prefix.endsWith('/')) {
    prefix += '/'
  }

  if (stats.isDirectory() && !opts.recursive) {
    throw new Error('Can only add directories using --recursive')
  }

  if (stats.isDirectory()) {
    // glob requires a POSIX filename
    file = file.split(path.sep).join('/')
    const fullDir = file + (file.endsWith('/') ? '' : '/')
    let dirName = fullDir.split('/')
    
    dirName = prefix + dirName[dirName.length - 2] + '/'
    const mg = new glob.sync.GlobSync('**/*', {
      cwd: file,
      follow: followSymlinks,
      dot: dir.hidden,
      ignore: dir.ignore
    })

    return mg.found
      .map((name) => {
        const fqn = fullDir + name
        // symlinks
        if (mg.symlinks[fqn] === true) {
          return {
            path: dirName + name,
            symlink: true,
            dir: false,
            content: fs.readlinkSync(fqn)
          }
        }

        // files
        if (mg.cache[fqn] === 'FILE') {
          return {
            path: dirName + name,
            symlink: false,
            dir: false,
            content: fs.createReadStream(fqn)
          }
        }

        // directories
        if (mg.cache[fqn] === 'DIR' || mg.cache[fqn] instanceof Array) {
          return {
            path: dirName + name,
            symlink: false,
            dir: true
          }
        }
        // files inside symlinks and others
      })
      // filter out null files
      .filter(Boolean)
  }

  return {
    path: prefix + path.basename(file),
    content: fs.createReadStream(file)
  }
}

function prepareFile (file, opts) {
  let files = [].concat(file)

  return flatmap(files, (file) => {
    if (typeof file === 'string') {
      if (!isNode) {
        throw new Error('Can only add file paths in node')
      }

      return loadPaths(opts, "", {path: file})
    }
    if (file.path && (typeof file.fulldir === 'object')) {
      if (!isNode) {
        throw new Error('Can only add file paths in node')
      }
      return loadPaths(opts, file.path, file.fulldir)
    }
    if (file.path && !file.content) {
      file.dir = true
      return file
    }

    if (file.content || file.dir) {
      return file
    }

    return {
      path: '',
      symlink: false,
      dir: false,
      content: file
    }
  })
}

exports = module.exports = prepareFile
