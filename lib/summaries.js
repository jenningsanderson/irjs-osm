// Summaries
module.exports = function (data, dest, callback) {

	var summaries = []

	data.forEach(function(entry){
		summaries.push([entry.summary])
	})
	callback(summaries, dest)
}
