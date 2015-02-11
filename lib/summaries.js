// Summaries
module.exports = function (data, dest, callback, cb) {

	var summaries = []

	data.forEach(function(entry){
		summaries.push([entry.summary])
	})
	callback(summaries, dest, cb)
}
