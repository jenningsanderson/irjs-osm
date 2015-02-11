var should = require('should')()
var assert = require("assert")

var osmFeed = require('../lib')

describe('Titles', function() {
	this.timeout(15000);
    it('should grab 10 Titles', function(done) {

        osmFeed.get({limit:10,outFile:'return'}, osmFeed.titles, function(res){
            assert.equal(res.split('\n').length, 10)
            done()
        })

    })
})