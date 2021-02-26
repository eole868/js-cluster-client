
<p align="center">
<img src="https://i.pinimg.com/564x/f4/f9/68/f4f968409552de91c2ff09d2a141f2e4.jpg" alt="ipfs-cluster-api" />
</p>
<h3 align="center">A Javascript client library for the IPFS Cluster HTTP API.</h3>

[![Made by](https://img.shields.io/badge/made%20by-Cluster%20Labs-blue.svg?style=flat-square)](https://clusterlabs.io) [![Main project](https://img.shields.io/badge/project-ipfscloud-blue.svg?style=flat-square)](http://github.com/cluster-labs/ipfscloud-web) [![npm version](https://badge.fury.io/js/ipfs-cluster-api.svg)](https://badge.fury.io/js/ipfs-cluster-api)
 <a href=""><img src="https://img.shields.io/badge/npm-%3E%3D3.0.0-orange.svg?style=flat-square" /></a> <a href=""><img src="https://img.shields.io/badge/Node.js-%3E%3D8.0.0-orange.svg?style=flat-square" /></a> <a href="https://david-dm.org/cluster-labs/ipfs-cluster-api"><img src="https://david-dm.org/cluster-labs/ipfs-cluster-api.svg?style=flat-square" /></a> <a href="https://bundlephobia.com/result?p=ipfs-cluster-api"><img src="https://flat.badgen.net/bundlephobia/minzip/ipfs-cluster-api"></a> <a href="https://github.com/feross/standard"><img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square"></a>
 [![Join the chat at https://gitter.im/ipfs-cluster-api/community](https://badges.gitter.im/cluster-labs/ipfs-cluster-api.svg)](https://gitter.im/ipfs-cluster-api/community)
 [![Build Status](https://travis-ci.org/cluster-labs/ipfs-cluster-api.svg?branch=master)](https://travis-ci.org/cluster-labs/ipfs-cluster-api)
 [![Code Coverage](https://codecov.io/gh/cluster-labs/ipfs-cluster-api/branch/master/graph/badge.svg)](https://codecov.io/gh/cluster-labs/ipfs-cluster-api)
---

使用其他语言阅读: [English](README.MD) | 简体中文

**UNOFFICIAL AND ALPHA**

This is a port of `ipfs/js-ipfs-api` adapted for the API exposed by `ipfs/ipfs-cluster`.

## Maintainer

[**Vaibhav Saini**](https://github.com/vasa-develop)

## Table of Contents

- [安装](#安装)
  -[运行ipfs服务和ipfs cluster服务](#运行ipfs服务和ipfs-cluster服务)
  - [如何导入模块](#导入和使用)
	- [运行在浏览器，使用Browserify引入](#使用browserify)
	- [运行在浏览器，使用Webpack引入](#使用webpack)
	- [运行在浏览器，使用cdn引入](#使用cdn)
  - [自定义Headers](#自定义Headers)
- [文档](#文档)
  - [命令行工具](#命令行工具)
  - [API文档](#api)
  - [Callbacks 和 promises](#callbacks-and-promises)
- [开发信息](#开发)
- [贡献](#贡献)
- [历史](#历史)
- [许可证](#许可证)


## 安装

在nodejs中使用，使用下面命令安装:

```
npm install --save ipfs-cluster-api
```

We support both the Current and Active LTS versions of Node.js. Please see [nodejs.org](https://nodejs.org/) for what these currently are.

### 运行ipfs服务和ipfs cluster服务

**ipfs daemon**

`ipfs-cluster-service` 启动前, 必须在本地运行 `ipfs` 服务。 需要注意 `ipfs` 监听端口， 默认端口是`5001`, 如下面命令所示， 也可以修改成其他端口。

```
# Show the ipfs config API port to check it is correct
> ipfs config Addresses.API
/ip4/127.0.0.1/tcp/5001
# Set it if it does not match the above output
> ipfs config Addresses.API /ip4/127.0.0.1/tcp/5001
# Restart the daemon after changing the config

# Run the daemon
> ipfs daemon
```

**ipfs-cluster-service daemon**

要使用API, 必须有一个运行中的服务. 确认服务监听的端口， 默认是`9094`, 也可以修改成其他端口.  `ipfs-cluster-service` 相关配置说明 [**配置文档**](https://github.com/ipfs/ipfs-cluster#install). 

安装ipfs-cluster-service之后，启动.

```
# Run the daemon
> ipfs-cluster-service daemon
```

### 导入和使用

```javascript
const ipfsCluster = require('ipfs-cluster-api')

// connect to ipfs daemon API server
const cluster = ipfsCluster('localhost', '9094', { protocol: 'http' }) // leaving out the arguments will default to these values

// or connect with multiaddr
const cluster = ipfsCluster('/ip4/127.0.0.1/tcp/9094')

// or using options
const cluster = ipfsCluster({ host: 'localhost', port: '9094', protocol: 'http' })

// or specifying a specific API path
const cluster = ipfsCluster({ host: '1.1.1.1', port: '80', 'api-path': '/some/api/path' })
```

### 在浏览器中

#### **使用Browserify**
和在Node.js中一样, 只需要在使用前用[browserify](http://browserify.org/)打包.
 > Note: 代码使用了 `es6`, 打包前先使用 [babel](https://babeljs.io/) 转换成 `es5`. 

#### **使用webpack**
和在Node.js中一样,只需要在使用前用[webpack](https://webpack.js.org/)打包.
 > Note: 代码使用了 `es6`, 打包前先使用 [babel](https://babeljs.io/) 转换成 `es5`.

#### **使用CDN**

可以直接引入cdn文件使用.

总是使用最新版, 如下:
```html
<!-- loading the minified version -->
<script src="https://unpkg.com/ipfs-cluster-api/dist/src/index.min.js"></script>
<!-- loading the human-readable (not minified) version -->
<script src="https://unpkg.com/ipfs-cluster-api/dist/src/index.js"></script>
```

CDN-based IPFS Cluster API 在`window` 对象上添加了一个`IpfsClusterAPI`函数,如下::

```javascript
// connect to ipfs daemon API server
const cluster = IpfsClusterAPI('localhost', '9094', { protocol: 'http' }) // leaving out the arguments will default to these values

// or connect with multiaddr
const cluster = IpfsClusterAPI('/ip4/127.0.0.1/tcp/9094')

// or using options
const cluster = IpfsClusterAPI({ host: 'localhost', port: '9094', protocol: 'http' })

// or specifying a specific API path
const cluster = IpfsClusterAPI({ host: '1.1.1.1', port: '80', 'api-path': '/some/api/path' })
```

If you omit the host and port, the client will parse `window.host`, and use this information. This also works, and can be useful if you want to write apps that can be run from multiple different gateways:

```javascript
const cluster = window.IpfsClusterAPI()
```

### **自定义 Headers**

如果你想为单独的请求设置自定义Headers, 比如设置Authorization header。 你可以像这样配置:

```javascript
const cluster = ipfsCluster({
  host: 'localhost',
  port: 9094,
  protocol: 'http',
  headers: {
    authorization: 'Basic ' + TOKEN
  }
})
```


## 文档
### 命令行工具
-	[`add`](#adding-&-pinning-data-to-cluster-command-line-tool)


#### Adding & pinning data to cluster-command-line-tool
##### **`add`**
```
$ bin/add.js --help
Usage: add [options] <file>
Options:
  -V, --version        output the version number
  -d, --debug          output extra debugging
  -p, --path <path>    wrapper dir (default: "/")
  -h, --host <host>    ipfs cluster api host (default: "")
  --port <port>        ipfs cluster api port (default: "")
  --showAll            show all file cid
  -t, --token <token>  ipfs cluster api base auth token (default: "")
  -r, --recursive      recursive all sub dir
  -a, --all            include hidden file
  --help               output usage information
```
返回格式如下:
```
{
  path: 'web',
  hash: 'QmdiRp2QU1pYb4r1Hmbfah3Ckqq2p56vDSBarm4VWHSdWg',
  size: 1042
}
```
或者使用showAll参数
```
[
  {
    path: 'web/index.html',
    hash: 'QmZJZG6WuiKMgXw4YANsgJQE98hmahBN7icxPtx4RoDR4M',
    size: 430
  },
  {
    path: 'web/main.css',
    hash: 'QmbFMke1KXqnYyBBWxB74N4c5SBnJMVAiMNRcGu6x1AwQH',
    size: 6
  },
  {
    path: 'web/main.js',
    hash: 'QmbFMke1KXqnYyBBWxB74N4c5SBnJMVAiMNRcGu6x1AwQH',
    size: 6
  },
  {
    path: 'web/sub.html',
    hash: 'QmY3Gn49Dx4ybPwZ8AQ9kFjjWRhr7Y1vVVYp5N9yyYMSg6',
    size: 393
  },
  {
    path: 'web',
    hash: 'QmdiRp2QU1pYb4r1Hmbfah3Ckqq2p56vDSBarm4VWHSdWg',
    size: 1042
  }
]
```
`host`, `port`, `token`参数支持通过配置文件配置， 默认配置文件为`~/.ipfs_cluster_client.yaml`,配置文件如下：
```yaml
host: "127.0.0.1"
port: 9094
token: ""
```
配置文件路径可以使用`IPFS_CLUSTER_CLIENT_CONF`环境变量自定义设置。
### API

API仍在开发中，公开的接口和`ipfs-cluster-ctl`的命令相似
[`ipfs/ipfs-cluster`](https://github.com/ipfs/ipfs-cluster).

-	[`add`](#adding-&-pinning-data-to-cluster)
	-	[`cluster.add(data, [options], [callback])`](#add)
-	[`peers`](#peer-management)
	-	[`cluster.peers.ls([callback])`](#peersls)
	-	[`cluster.peers.rm(peerid, [callback])`](#peersremove)
-	[`pin`](#pins-management)
	-	[`cluster.pin.ls([options], [callback])`](#pinls)
	-	[`cluster.pin.add(cid, [options], [callback])`](#pinadd)
	-	[`cluster.pin.rm(cid, [callback])`](#pinremove)
-	[`health`](#health)
	- [`cluster.health.graph([callback])`](#graph)
	- [`cluster.health.metrics(type, [callback])`](#metrics)
-	[`miscellaneous`](#node-management)
	-	[`cluster.id([callback])`](#id)
	-	[`cluster.version([callback])`](#version)
	- [`cluster.status([cid], [options], [callback])`](#status)
	-	[`cluster.sync([cid], [options], [callback])`](#sync)
	-	[`cluster.recover([cid], [options], [callback])`](#recover)


### Adding & pinning data to cluster
#### **`add`**
> 添加并固定文件到集群中

Add allows to add and replicate content to several ipfs daemons, performing a Cluster Pin operation on success. It takes elements from local paths as well as from web URLs (accessed with a GET request).

Cluster Add is equivalent to "ipfs add" in terms of DAG building, and supports the same options for adjusting the chunker, the DAG layout etc. However, it will allocate the content and send it directly to the allocated peers (among which may not necessarily be the local ipfs daemon).

Once the adding process is finished, the content is fully added to all allocations and pinned in them. This makes cluster add slower than a local ipfs add, but the result is a fully replicated CID on completion. If you prefer faster adding, add directly to the local IPFS and trigger a cluster "pin add".


**`cluster.add(data, [options], [callback])`**

  `data`支持的类型:

-   a  [`Buffer instance`](https://www.npmjs.com/package/buffer)
-   a  [`Readable Stream`](https://www.npmjs.com/package/readable-stream)
-   a  [`Pull Stream`](https://www.npmjs.com/package/pull-stream)
-   an array of objects, each of the form:
```javascript
{
  path: '/tmp/myfile.txt', // The file path
  content: <data> // A Buffer, Readable Stream or Pull Stream with the contents of the file
}
```
or fulldir (只有在nodejs中支持)
```javascript
{
  path: '/tmp/myfile.txt', // The file path
  fulldir: { //options.recursive must to be true
    path: file, // directory path
    hidden: <boolean> // include hidden file
  }
}
```

如果 `content` 和 `fulldir` 都没有, 将会添加一个名字是`path
`的空目录


`options` 是一个可选参数， 包含下面的key:
-	`replication-min` (int, default: 0):	Sets the minimum replication factor for pinning this file
-	`replication-max` (int, default: 0):	Sets the maximum replication factor for pinning this: file
-	`name` (string, default: ""):	Sets a name for this pin
-	`shard` (bool, default: false)	
-	`shard-size` (int, default: 0)
-	`recursive` (bool, default: false):	Add directory paths recursively
-	`layout` (string, default: false):	Dag layout to use for dag generation: balanced or trickle
-	`chunker` (string, default: "size-262144"):		'size-[size]' or 'rabin-[min]-[avg]-[max]'
-	`raw-leaves` (bool, default: false):	Use raw blocks for leaves
-	`hidden` (bool, default: false):	Include files that are hidden.  Only takes effect on recursive add
-	`wrap-with-directory` (bool, default: false):	Wrap a with a directory object
-	`progress` (bool, default: false)	
-	`cid-version` (int, default: 0)
-	`hash` (string, default: "sha2-256"):	Hash function to use. Implies cid-version=1
-	`stream-channels` (bool, default: true)	
-	`nocopy` (bool, default: false):	Add the URL using filestore. Implies raw-leaves


`callback` 类型为 `function (err, res) {}`, err为失败时的错误信息. 如果成功, `res` 返回一个数组，数组中元素格式如下:

```javascript
{
  path: '/path/to/file/foo.txt',
  hash: 'QmRG3FXAW76xD7ZrjCWk8FKVaTRPYdMtwzJHZ9gArzHK5f',
  size: 2417
}
```

如果`callback`参数为空, 将会返回一个promise.

### Example
```javascript
cluster.add(Buffer.from("vasa"), (err, result) => {
  err ? console.error(err) : console.log(result)
})
```
### Peers management
> Lists, adds & removes peers from the cluster

#### **`peers`**

#### **`peers.ls`**
> 列出集群中的所有节点
	
This command tells IPFS Cluster to no longer manage a CID. This will trigger unpinning operations in all the IPFS nodes holding the content.

When the request has succeeded, the command returns the status of the CID in the cluster. The CID should disappear from the list offered by "pin ls", although unpinning operations in the cluster may take longer or fail.	

**`cluster.peers.ls([callback])`**
	
`callback` must follow `function (err, res) {}` signature, where `err` is an error if the operation was not successful. If successful, `res` returns a information abount the connected peers in the following form:
```json
[ { "id": "QmPq34QAMCFLNTXWtM3pc7qeQ2kneuCgLZjSVywWoEumRn",
	"addresses":
		[ "/p2p-circuit/ipfs/QmPq34QAMCFLNTXWtM3pc7qeQ2kneuCgLZjSVywWoEumRn",
			"/ip4/127.0.0.1/tcp/9096/ipfs/QmPq34QAMCFLNTXWtM3pc7qeQ2kneuCgLZjSVywWoEumRn",
			"/ip4/10.184.9.134/tcp/9096/ipfs/QmPq34QAMCFLNTXWtM3pc7qeQ2kneuCgLZjSVywWoEumRn",
			"/ip4/172.17.0.1/tcp/9096/ipfs/QmPq34QAMCFLNTXWtM3pc7qeQ2kneuCgLZjSVywWoEumRn",
			"/ip4/172.18.0.1/tcp/9096/ipfs/QmPq34QAMCFLNTXWtM3pc7qeQ2kneuCgLZjSVywWoEumRn" ],
	"cluster_peers": [ "QmPq34QAMCFLNTXWtM3pc7qeQ2kneuCgLZjSVywWoEumRn" ],
	"cluster_peers_addresses": null,
	"version": "0.10.1",
	"commit": "",
	"rpc_protocol_version": "/ipfscluster/0.10/rpc",
	"error": "",
	"ipfs":
		{ "id": "QmdKAFhAAnc6U3ik6XfEDVKEsok7TnQ1yeyXmnnvGFmBhx",
			"addresses": [/*Array*/],
			"error": "" },
	"peername": "jarvis" } ]
```

### Example
```javascript
cluster.peers.ls((err, peers) => {
	err ? console.error(err) : console.log(peers)
})
```

#### **`peers.remove`**
> 删除一个节点

This command removes a peer from the cluster. If the peer is online, it will automatically shut down. All other cluster peers should be online for the operation to succeed, otherwise some nodes may be left with an outdated list of cluster peers.
	
**`cluster.peers.rm(peerid, [callback])`**

Where `peerid` is the `id` of the peer to be removed.
	
`callback` must follow `function (err, res) {}` signature, where `err` is an error if the operation was not successful.

If no `callback` is passed, a promise is returned.

### Example
```javascript
cluster.peers.rm("QmdKAFhAAnc6U3ik6XfEDVKEsok7TnQ1yeyXmnnvGFmBhx", (err) => {
	err ? console.error(err) : console.log("peer removed") 
})
```

### Pins management
> Lists, adds & removes pins from the pinlist of the cluster

#### **`pin`**

#### **`pin.ls`**
> 列出pinned文件

This command will list the CIDs which are tracked by IPFS Cluster and to which peers they are currently allocated. This list does not include any monitoring information about the IPFS status of the CIDs, it merely represents the list of pins which are part of the shared state of the cluster. For IPFS-status information about the pins, use "status".
	
**`cluster.pin.ls([options], [callback])`**    

`options` is an optional object argument that might include the following keys:
* `filter`: (default: `pin`)  The filter only takes effect when listing all pins. The possible values are:

	- all
	- pin
	- meta-pin
	- clusterdag-pin
	- shard-pin

`callback` must follow `function (err, pins) {}` signature, where `err` is an error if the operation was not successful. If successful, `pins` returns the list of pins.

If no `callback` is passed, a promise is returned.

### Example
	
```javascript
cluster.pin.ls({filter: 'all'}, (err, pins) => {
	err ? console.error(err) : console.log(pins)
})
```

	  

	  

#### **`pin.add`**
> 在集群中pin一个cid
	
This command tells IPFS Cluster to start managing a CID. Depending on the pinning strategy, this will trigger IPFS pin requests. The CID will become part of the Cluster's state and will tracked from this point.

When the request has succeeded, the command returns the status of the CID in the cluster and should be part of the list offered by "pin ls".

An optional replication factor can be provided: -1 means "pin everywhere" and 0 means use cluster's default setting. Positive values indicate how many peers should pin this content.

An optional allocations argument can be provided, allocations should be a comma-separated list of peer IDs on which we want to pin. Peers in allocations are prioritized over automatically-determined ones, but replication factors would stil be respected.
	
**`cluster.pin.add(cid, [options], [callback])`**

 `cid` 是要pinned的[CID](https://docs.ipfs.io/guides/concepts/cid/).

`options` is an optional object argument that might include the following keys:
-	`replication-min`	(int, default: 0):	Sets the minimum replication factor for this pin	
-	`replication-max`	(int, default: 0):	Sets the maximum replication factor for this pin
-	`replication`	(int, default: 0):	Sets a custom replication factor (overrides `replication-min` and `replication-max`)
-	`name`	(int, default: ""):	Sets a name for this pin
-	`user-allocations`: (string array): Optional comma-separated list of peer IDs where data will be pinned
-	`shard_size`	(int, default: 0)

`callback` 类型为 `function (err, res) {}`, err为失败时的错误信息。

如果`callback`参数为空, 将会返回一个promise。

### Example
```javascript
cluster.pin.add(CID, (err) => {
	err ? console.error(err) : console.log('pin added')
})
```

   

#### **`pin.remove`**
> 删除一个pinned文件

This command tells IPFS Cluster to no longer manage a CID. This will trigger unpinning operations in all the IPFS nodes holding the content.

When the request has succeeded, the command returns the status of the CID in the cluster. The CID should disappear from the list offered by "pin ls", although unpinning operations in the cluster may take longer or fail.

	
	
**`cluster.pin.rm(cid, [callback])`**

`cid` 是将要移出pinlist的 [CID](https://docs.ipfs.io/guides/concepts/cid/).

`callback` 类型为 `function (err, res) {}`, err为失败时的错误信息。

如果`callback`参数为空, 将会返回一个promise。

### Example
```javascript
const CID = "QmU4xZd9Yj7EzRj5ntw6AJ1VkbWNe1jXRM56KoRLkTxKch"

cluster.pin.rm(CID, (err) => {
	err ? console.error(err) : console.log(`${CID} unpinned`)
})
```



#### Node management
#### **`id`**
> 获取节点的 `name` 和地址信息

This command displays information about the peer that the tool is contacting.

**`cluster.id([callback])`**

`callback` 类型为 `function (err, id) {}`, err为失败时的错误信息。如果成功, `id` returns the information about the peer that the tool is contacting.

如果`callback`参数为空, 将会返回一个promise。

### Example

```javascript
cluster.id((err, id) => {
	err ? console.error(err) : console.log(id)
})
```

#### **`version`**
> 获得当前集群服务器版本

This command retrieves the IPFS Cluster version and can be used
to check that it matches the CLI version 

**`cluster.version([callback])`**

`callback` 类型为 `function (err, version) {}`, err为失败时的错误信息。如果成功,  `version` will return the IPFS Cluster version.

如果`callback`参数为空, 将会返回一个promise。


### Example
```javascript
cluster.version((err, version) => {
	err ? console.error(err) : console.log(version)
})
```

#### **`health`**

#### **`graph`**
> Lists the health graph of the cluster

This command queries all connected cluster peers and their ipfs peers to generate a graph of the connections.  Output is a dot file encoding the cluster's connection state.

*  **`cluster.health.graph([callback])`**

`callback` must follow `function (err, graph) {}` signature, where `err` is an error if the operation was not successful. If successful, `graph` returns the cluster's current state.

If no `callback` is passed, a promise is returned.

#### Example

```javascript
cluster.health.graph((err, health) => {
	err ? console.error(err) : console.log(health)
})
```

#### **`metrics`**
> Lists the health metrics of the cluster

This commands displays the latest valid metrics of the given type logged by this peer for all current cluster peers.

* **`cluster.health.metrics(type, [callback])`**

`type` is the type of the monitoring desired(`freespace` OR `ping`)

`callback` must follow `function (err, metrics) {}` signature, where `err` is an error if the operation was not successful. If successful, `metrics` returns the desired metrics.

If no `callback` is passed, a promise is returned.

### Example

```javascript
cluster.health.metrics('freespace', (err, metrics) => {
	err ? console.error(err) : console.log(metrics)
})
```

####	**`status`**
> Retrieves the status of the CIDs tracked by IPFS Cluster

This command retrieves the status of the CIDs tracked by IPFS Cluster, including which member is pinning them and any errors. If a CID is provided, the status will be only fetched for a single
item. Metadata CIDs are included in the status response

The status of a CID may not be accurate. A manual sync can be triggered with "sync".

When the `local` option is set, it will only fetch the status from the contacted cluster peer. By default, status will be fetched from all peers.

When the `filter` option is set, it will only fetch the peer information where status of the pin matches at least one of the filter values.

**`cluster.status([cid], [options], [callback])`**

Where `cid` is the [CID](https://docs.ipfs.io/guides/concepts/cid/) of the data for which we need the status.

`options` is an optional object argument that might include the following keys:
* `filter`(string): list of filters
  - error
  - cluster_error
  - pin_error
  - pin_queued
  - pinned
  - pinning
  - queued
  - remote
  - unpin_error
  - unpin_queued
  - unpinned
  - unpinning
  
* `local`(boolean): if set `true`, runs operation only on the contacted peer

`callback` must follow `function (err, res) {}` signature, where `err` is an error if the operation was not successful. If successful `res` returns the status of the passed `cid` 

If no `callback` is passed, a promise is returned.

### Example
```javascript
const CID = "QmU4xZd9Yj7EzRj5ntw6AJ1VkbWNe1jXRM56KoRLkTxKch"

cluster.status(CID, { filter:  'pinned', local:  true }, (err, res) => {
	err ? console.error(err) : console.log(res)
})
```

####	**`sync`**
> Syncs the pinset/CID across all the peers in the cluster

This command asks Cluster peers to verify that the current status of tracked CIDs is accurate by triggering queries to the IPFS daemons that pin them. If a CID is provided, the sync and recover operations will be limited to that single item.

Unless providing a specific CID, the command will output only items which have changed status because of the sync or are in error state in some node, therefore, the output should be empty if no operations were performed.

CIDs in error state may be manually recovered with "recover".

When the `local` option is passed, it will only trigger sync operations on the contacted peer. By default, all peers will sync.

**`cluster.sync([cid], [options], [callback])`**

Where `cid` is the [CID](https://docs.ipfs.io/guides/concepts/cid/) of the data to be synced.

`options` is an optional object argument that might include the following keys:
* `local`(boolean): if set `true`, runs operation only on the contacted peer

`callback` must follow `function (err) {}` signature, where `err` is an error if the operation was not successful.

If no `callback` is passed, a promise is returned.

### Example

```javascript
const CID = "QmU4xZd9Yj7EzRj5ntw6AJ1VkbWNe1jXRM56KoRLkTxKch"

cluster.sync(CID, { local:  true }, (err) => {
	err ? console.error(err) : console.log(`${CID} synced`)
})
```

####	**`recover`**
> re-track or re-forget CIDs in error state

This command asks Cluster peers to re-track or re-forget CIDs in error state, usually because the IPFS pin or unpin operation has failed.

The command will wait for any operations to succeed and will return the status of the item upon completion. Note that, when running on the full sets of tracked CIDs (without argument), it may take a considerably long time.

When the `local` option is set, it will only trigger recover operations on the contacted peer (as opposed to on every peer).

For now, ONLY requests with parameter `local=true` are supported


**`cluster.recover([cid], [options], [callback])`**

Where `cid` is the [CID](https://docs.ipfs.io/guides/concepts/cid/) of the data to be recovered.

`options` is an optional object argument that might include the following keys:
* `local`(boolean, default: true): if set `true` it will only trigger recover
operations on the contacted peer

`callback` must follow `function (err) {}` signature, where `err` is an error if the operation was not successful.

If no `callback` is passed, a promise is returned.

### Example
```javascript
const CID = "QmU4xZd9Yj7EzRj5ntw6AJ1VkbWNe1jXRM56KoRLkTxKch"

cluster.recover(CID, { local:  true }, (err) => {
	err ? console.error(err) : console.log(`${CID} recovered`)
})
```

## 开发

### 测试
We run tests by executing `npm test` in a terminal window. This will run Node.js tests.

## 贡献

The `ipfs-cluster-api` is a work in progress. As such, there's a few things you can do right now to help out:

- **[Check out the existing issues](https://github.com/cluster-labs/ipfs-cluster-api/issues)**!
- **Perform code reviews**. More eyes will help 
	- speed the project along 
	- ensure quality and
	- reduce possible future bugs.
- **Add tests**. There can never be enough tests.

You can also checkout our **[other projects](https://github.com/cluster-labs)**

It's recommended to follow the [Contribution Guidelines](https://github.com/ipfs/community/blob/master/CONTRIBUTING_JS.md).

## 历史

This module started as a direct mapping from the Go `ipfs-cluster-ctl` to a JavaScript implementation.

## 许可证

[MIT](LICENSE)