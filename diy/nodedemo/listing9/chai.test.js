const chai = require('chai')
const expect = chai.expect

const foo = 'bar'

expect(foo).to.be.a('string')
expect(foo).to.eq('bar')

chai.should()
const shouldfoo = 'mor'

shouldfoo.should.be.a('string')
shouldfoo.should.be.eq('bar')


