const cluster = require('./helpers')
const assert = require('chai').assert

describe('monitor', () => {
    it('logs metrics for a peer', (done) => {
        cluster.monitor('freespace', {}, (err, metrics) => {
            console.log(metrics)
            assert.notExists(err, 'throws error while logging metrics for a peer')
            done()
        })
    })
})
