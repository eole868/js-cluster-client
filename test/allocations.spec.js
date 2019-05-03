const cluster = require('./helpers')
const assert = require('chai').assert

const filter = 'all'
const CID = 'QmU4xZd9Yj7EzRj5ntw6AJ1VkbWNe1jXRM56KoRLkTxKch'

describe('allocations', () => {

    it('filters all pins', (done) => {
        cluster.allocations.filter('all', (err, details) => {
            assert.notExists(err, 'throws error while listing all pinned CIDs')
            done()
        })
    })

    it('filters datatype pins', (done) => {
        cluster.allocations.filter('pin', (err, details) => {
            assert.notExists(err, 'throws error while listing datatype pinned CIDs')
            done()
        })
    })

    it('filters metatype pins', (done) => {
        cluster.allocations.filter('meta-pin', (err, details) => {
            assert.notExists(err, 'throws error while listing metatype pinned CIDs')
            done()
        })
    })

    it('filters clusterDAGtype pins', (done) => {
        cluster.allocations.filter('clusterdag-pin', (err, details) => {
            assert.notExists(err, 'throws error while listing clusterDAGtype pinned CIDs')
            done()
        })
    })

    it('filters shardtype pins', (done) => {
        cluster.allocations.filter('shard-pin', (err, details) => {
            assert.notExists(err, 'throws error while listing shardtype pinned CIDs')
            done()
        })
    })

    it('filters badtype pins', (done) => {
        cluster.allocations.filter(null, (err, details) => {
            assert.notExists(err, 'throws error while listing badtype pinned CIDs')
            done()
        })
    })

    it('shows a hash allocations', (done) => {
        cluster.allocations.hash(CID, (err, details) => {
            assert.notExists(err, 'throws error while showing a hash allocations')
            done()
        })
    })

})