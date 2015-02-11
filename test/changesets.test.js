var should = require('should')()
var assert = require("assert")

var osmFeed = require('../lib')

describe('Changesets', function() {

    it('should grab 3 changesets', function(done) {
        
        osmFeed.get({limit:3,outFile:'return'}, osmFeed.changesets, function(res){
            assert.equal(res.split('\n').length, 3)
            done()
        })

    })

    it('should make a csv with headers', function(done) {
        
        osmFeed.get({limit:1, format:'csv',outFile:'return'}, osmFeed.changesets, function(res){
            res.split('\n')[0].should.be.eql('ID,Title,User,Link')
            done()
        })

    })
})

// Not entirely sure how to test this because it just writes 
// the results to stdout or a file...
//
//
//