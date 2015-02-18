var request = require('request')
var parseString = require('xml2js').parseString;


module.exports = {
	extractTitle : function(entry){
		start = entry.title.indexOf("has uploaded")
		if ( entry.title.substring(start+13) == 'an untitled changeset'){
			return "Untitled Changeset"
		}else{
			return(entry.title.substring(start+27, entry.title.length-1))
		}
	},

	extractUser : function(entry){
		start = entry.summary.indexOf(">") + 1
  	    end = entry.summary.indexOf("</a>")
        return(entry.summary.substr(start,end-start))
	},

	extractChangesetID : function(entry){
        return(entry.link.substring(entry.link.indexOf('changeset/')+10))
	}, 

	downloadChangeset : function(entry, cb){
		url = "http://api.openstreetmap.org/api/0.6/changeset/" + entry + '?include_discussion=true'
		request(url, function (err, res) {
  			cb(res)
    	})
	}
}