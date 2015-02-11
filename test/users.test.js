var should = require('should')()
var assert = require("assert")

var osmFeed = require('../lib')

describe('Users', function() {

    it('should grab 3 users', function(done) {
        
        osmFeed.get({limit:3,outFile:'return'}, osmFeed.users, function(res){
            assert.equal(res.split('\n').length, 3)
            done()
        })

    })
})