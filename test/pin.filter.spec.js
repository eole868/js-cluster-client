const cluster = require('./helpers')
const assert = require('chai').assert

const filter = 'all'

describe('pin.filter', () => {

    it('filters all pins', (done) => {
        cluster.pin.filter('all', (err, details) => {
            assert.notExists(err, 'throws error while listing sll pinned CIDs')
            done()
        })
    })

    it('filters datatype pins', (done) => {
        cluster.pin.filter('pin', (err, details) => {
            assert.notExists(err, 'throws error while listing sll pinned CIDs')
            done()
        })
    })

    it('filters metatype pins', (done) => {
        cluster.pin.filter('meta-pin', (err, details) => {
            assert.notExists(err, 'throws error while listing sll pinned CIDs')
            done()
        })
    })

    it('filters clusterDAGtype pins', (done) => {
        cluster.pin.filter('clusterdag-pin', (err, details) => {
            assert.notExists(err, 'throws error while listing sll pinned CIDs')
            done()
        })
    })

    it('filters shardtype pins', (done) => {
        cluster.pin.filter('shard-pin', (err, details) => {
            assert.notExists(err, 'throws error while listing sll pinned CIDs')
            done()
        })
    })

    it('filters badtype pins', (done) => {
        cluster.pin.filter(null, (err, details) => {
            assert.notExists(err, 'throws error while listing sll pinned CIDs')
            done()
        })
    })

})