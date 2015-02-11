// Changeset

module.exports = function (data, dest, callback, cb) {
	var helpers = module.parent.exports.helpers
	var changesets = {}
	changesets.meta = {'collection':'Changesets',
				  'headers':['ID','Title', 'User','Link']}
	changesets.data = []

	data.forEach(function(entry){
		changesets.data.push( [
			entry.link.substring(entry.link.indexOf('changeset/')+10), 
			helpers.extractTitle(entry), 
			helpers.extractUser(entry),
			entry.link 
			] )
	})

	callback(changesets, dest, cb)
}