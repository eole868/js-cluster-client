const cluster = require('./helpers')
const assert = require('chai').assert

describe('monitor', () => {
    it('logs \'freespace\' metrics for a peer', (done) => {
        cluster.monitor('freespace', (err, metrics) => {
            assert.notExists(err, 'throws error while logging metrics for a peer')
            done()
        })
    })

    it('logs \'ping\' metrics for a peer', (done) => {
        cluster.monitor('ping', (err, metrics) => {
            assert.notExists(err, 'throws error while logging metrics for a peer')
            done()
        })
    })
})
