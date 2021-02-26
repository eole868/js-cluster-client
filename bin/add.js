#!/usr/bin/env node

const IpfsClusterAPI = require('..')
const { Command } = require('commander')

const program = new Command()
program.version('0.0.1')

program
  .option('-d, --debug', 'output extra debugging')
  .option('-p, --path <path>', 'wrapper dir', '/')
  .option('-h, --host <host>', 'ipfs cluster api host', '127.0.0.1')
  .option('--port <port>', 'ipfs cluster api port', '9094')
  .option('--showAll', 'show all file cid')
  .option('-t, --token <token>', 'ipfs cluster api base auth token', '')
  .option('-r, --recursive', 'recursive all sub dir')
  .option('-a, --all', 'include hidden file')
  .arguments('<file>')
  .action((file)=>{
    run(file)
  })
  program.parse(process.argv)

function run(file) {
    const options = program.opts()
    if (options.debug) console.log(options)
    let headers = {}
    if(options.token) {
        //dXNlcjp1dnh6Z2NCMThMT1Zv
        headers = {
            authorization: 'Basic ' + options.token
        }
    }
    const cluster = IpfsClusterAPI({
        host: options.host,//'localhost',
        port: options.port,//9094,
        protocol: 'http',
        headers,
    })

    cluster.add({path: options.path, fulldir: {
            path: file,
            hidden: options.all,
            ignore: false,
        }
    }, {
        recursive: options.recursive,
    }).then(res=>{
        if(!options.showAll && options.recursive) {
            const path = require('path')
            let filePath = path.resolve(file)
            filePath = filePath.split(path.sep).join('/')
            const fullDir = filePath + (filePath.endsWith('/') ? '' : '/')
            let dirName = fullDir.split('/')
            dirName = dirName[dirName.length - 2]
            res = res.filter((item)=>{return item.path==dirName})
        }
        if(options.showAll) {
            console.log(res)
        }
        else{
            console.log(res[0])
        }
    })
}
