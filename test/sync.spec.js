const cluster = require('./helpers')
const assert = require('chai').assert

const CID = "QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4"

describe('sync', () => {

    it('re-syncs all seen status against status reported by the IPFS daemon', (done) => {
        cluster.sync({ local: true }, (err) => {
            assert.notExists(err, 'throws error while re-syncing all seen status against status reported by the IPFS daemon')
            done()
        })
    })

    it('re-syncs seen status against status reported by the IPFS daemon', (done) => {
        cluster.sync(CID, { local: true }, (err) => {
            assert.notExists(err, 'throws error while re-syncing seen status against status reported by the IPFS daemon')
            done()
        })
    })
})
