#!/usr/bin/env node

const IpfsClusterAPI = require('..')
const { Command } = require('commander')

const program = new Command()
program.version('0.0.1')

program
  .option('-d, --debug', 'output extra debugging')
  .option('-p, --path <path>', 'wrapper dir', '/')
  .option('-h, --host <host>', 'ipfs cluster api host', '')
  .option('--port <port>', 'ipfs cluster api port', '')
  .option('--showAll', 'show all file cid')
  .option('-t, --token <token>', 'ipfs cluster api base auth token', '')
  .option('-r, --recursive', 'recursive all sub dir')
  .option('-a, --all', 'include hidden file')
  .arguments('<file>')
  .action((file)=>{
    run(file)
  })
  program.parse(process.argv)
  

function parseHost() {
    const configFile = process.env.IPFS_CLUSTER_CLIENT_CONF || process.env.HOME + "/.ipfs_cluster_client.yaml"
    const fs = require('fs')
    try{
        const path = require('path')
        const fileConfigPath = path.resolve(configFile)
        const stats = fs.statSync(fileConfigPath)
        if(stats.isFile) {
            const confContent = fs.readFileSync(fileConfigPath, 'utf-8')
            const YAML = require('yaml')
            const host = YAML.parse(confContent)
            return host
        }
    }catch(e) {
    }
    return {
        host: '127.0.0.1',
        port: '9094',
        token: '',
    }
    
    

    
}
function run(file) {
    const options = program.opts()
    if (options.debug) console.log(options)

    let headers = {}
    const conf = parseHost()
    options.host = options.host || conf.host
    options.port = options.port || conf.port
    options.token = options.token || conf.token
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
