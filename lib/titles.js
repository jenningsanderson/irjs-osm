// Titles
module.exports = function (data, dest, callback, cb) {
	var helpers = module.parent.exports.helpers

	var titles = {meta: {'collection':'Changeset Titles',
	                     'headers':['title']},
						 data:[]}

	data.forEach(function(entry){
		titles.data.push( [ helpers.extractTitle(entry) ] )
	})

	callback(titles, dest, cb)
}