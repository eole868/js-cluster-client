const cluster = require('./helpers')
const assert = require('chai').assert

const CID = "QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4"

describe('pin.ls', () => {

    it('lists details for CIDs with \'cluster_error\' status', (done) => {
        cluster.pins.ls({ filter: 'cluster_error', local: true }, (err, details) => {
            assert.notExists(err, 'throws error while listing details for CIDs with \'cluster_error\' status')
            done()
        })
    })

    it('lists details for CIDs with \'pin_error\' status', (done) => {
        cluster.pins.ls({ filter: 'error', local: true }, (err, details) => {
            assert.notExists(err, 'throws error while listing details for CIDs with \'pin_error\' status')
            done()
        })
    })

    it('lists details for CIDs with \'unpin_error\' status', (done) => {
        cluster.pins.ls({ filter: 'unpin_error', local: true }, (err, details) => {
            assert.notExists(err, 'throws error while listing details for CIDs with \'unpin_error\' status')
            done()
        })
    })

    it('lists details for CIDs with \'errored\' status', (done) => {
        cluster.pins.ls({ filter: 'error', local: true }, (err, details) => {
            assert.notExists(err, 'throws error while listing details for CIDs with \'errored\' status')
            done()
        })
    })

    it('lists details for CIDs with \'pinned\' status', (done) => {
        cluster.pins.ls({ filter: 'pinned', local: true }, (err, details) => {
            assert.notExists(err, 'throws error while listing details for CIDs with \'pinned\' status')
            done()
        })
    })

    it('lists details for CIDs with \'pinning\' status', (done) => {
        cluster.pins.ls({ filter: 'pinning', local: true }, (err, details) => {
            assert.notExists(err, 'throws error while listing details for CIDs with \'pinning\' status')
            done()
        })
    })

    it('lists details for CIDs with \'pinned\' status', (done) => {
        cluster.pins.ls({ filter: 'pinned', local: true }, (err, details) => {
            assert.notExists(err, 'throws error while listing details for CIDs with \'pinned\' status')
            done()
        })
    })

    it('lists details for CIDs with \'unpinning\' status', (done) => {
        cluster.pins.ls({ filter: 'unpinning', local: true }, (err, details) => {
            assert.notExists(err, 'throws error while listing details for CIDs with \'unpinning\' status')
            done()
        })
    })

    it('lists details for CIDs with \'unpinned\' status', (done) => {
        cluster.pins.ls({ filter: 'unpinned', local: true }, (err, details) => {
            assert.notExists(err, 'throws error while listing details for CIDs with \'unpinned\' status')
            done()
        })
    })

    it('lists details for CIDs with \'remote\' status', (done) => {
        cluster.pins.ls({ filter: 'remote', local: true }, (err, details) => {
            assert.notExists(err, 'throws error while listing details for CIDs with \'remote\' status')
            done()
        })
    })

    it('lists details for CIDs with \'pin_queued\' status', (done) => {
        cluster.pins.ls({ filter: 'pin_queued', local: true }, (err, details) => {
            assert.notExists(err, 'throws error while listing details for a \'pin_queued\' CID')
            done()
        })
    })

    it('lists details for CIDs with \'unpin_queued\' status', (done) => {
        cluster.pins.ls({ filter: 'unpin_queued', local: true }, (err, details) => {
            assert.notExists(err, 'throws error while listing details for CIDs with \'unpin_queued\' status')
            done()
        })
    })

    it('lists details for CIDs with \'queued\' status', (done) => {
        cluster.pins.ls({ filter: 'queued', local: true }, (err, details) => {
            assert.notExists(err, 'throws error while listing details for CIDs with \'queued\' status')
            done()
        })
    })

    it('lists status details for a CID', (done) => {
        cluster.pins.ls(CID, { local: true }, (err, details) => {
            assert.notExists(err, 'throws error while listing status details for a CIDs')
            done()
        })
    })
})
