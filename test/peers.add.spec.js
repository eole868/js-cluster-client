const cluster = require('./helpers')
const assert = require('chai').assert

describe('peers.add', () => {

    it('throws error while adding a peer with invalid address', (done) => {
        cluster.peers.add("invalid address", {}, (err) => {
            assert.notDeepEqual(err, null, "adds a peer with invlaid address")
            done()
        })
    })

    /* it('adds a cluster peer', (done) => {
        cluster.peers.add("QmdsFjUhzJ4iaEymronfj1DZpCHnwnSzK5G3uU5k2N8gp9", (err) => {
            assert.notExists(err, 'throws error while fetching the list of cluster peers')
            done()
        })
    }) */
})
