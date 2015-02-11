var should = require('should')()
var assert = require("assert")

var osmFeed = require('../lib')

describe('Summaries', function() {

    it('should grab 3 changeset summaries', function(done) {
        
        osmFeed.get({limit:3,outFile:'return'}, osmFeed.summaries, function(res){
            assert.equal(res.split('\n').length, 3)
            done()
        })

    })

    it('should make a csv with header: "Summary"', function(done) {
        
        osmFeed.get({limit:1, format:'csv',outFile:'return'}, osmFeed.summaries, function(res){
            res.split('\n')[0].should.be.eql('Summary')
            done()
        })

    })
})
