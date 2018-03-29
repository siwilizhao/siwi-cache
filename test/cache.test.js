const Cache = require('../index')
const options = {}
const cache = new Cache(options)
const expect = require('chai').expect
describe('cache.js', () => {
    it('#set', async () => {
        const res = await cache.set('test', 'hello test', 600)
        expect(res).to.equal(true)
    })
    it('#get', async () => {
        const res = await cache.get('test')
        console.log(res)
        expect(res).to.be.a('string')
    })
    it('#del', async () => {
        await cache.set('test_del', 'hello test', 600)
        const res = await cache.del('test_del')
        console.log(res)
        expect(res).equal(true)
    })
    it('#incr', async () => {
        const res = await cache.incr('incr', 10)
        console.log(res)
        expect(res).to.be.a('number')
    })
})