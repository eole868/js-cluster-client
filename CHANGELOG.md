## [0.0.6](https://github.com/cluster-labs/ipfs-cluster-api/compare/v0.0.6...v0.0.5) (2019-05-20)

### Bug Fixes

- importing IpfsCluster in multiple ways ([#4](https://github.com/cluster-labs/ipfs-cluster-api/issues/4))([
d7da873](https://github.com/cluster-labs/ipfs-cluster-api/commit/d7da873c9615cf60a0a829bd02b45965c1455e89))

- Not able to ADD peer to a cluster using HTTP endpoint ([#5](https://github.com/cluster-labs/ipfs-cluster-api/issues/5))([
44659ce](https://github.com/cluster-labs/ipfs-cluster-api/commit/44659cedca17dc97bde7e4508e64dd3470d004ac))

### Other Improvements

-   Added Extensive documentation for available `option`(s) for various commands

## [0.0.5](https://github.com/cluster-labs/ipfs-cluster-api/compare/v0.0.3...v0.0.5) (2019-05-11)

### Bug Fixes

- 'add' command doesn't return the CID for the added data. ([#3](https://github.com/cluster-labs/ipfs-cluster-api/issues/3))([6a7a1b](https://github.com/cluster-labs/ipfs-cluster-api/commit/6a7a1b5899f2c3e37ccd0bd0766f51aec0e721a4))

### New features

- Browser Support
    - using browserify
    - using webpack
    - using CDN links

## [0.0.3](https://github.com/cluster-labs/ipfs-cluster-api/compare/v0.0.2...v0.0.3) (2019-05-07)

### New features

- support for passing `options` in the commands: `add`, `pin`, `peers`, `health`, `status`, `sync`, `recover`

### Other improvements

- Extensive README

- Reached feature parity with Go [`ipfs-cluster-ctl`](https://cluster.ipfs.io/documentation/ipfs-cluster-ctl/)