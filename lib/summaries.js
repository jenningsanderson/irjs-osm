// Summaries
module.exports = function (data, dest, callback, cb) {

	var summaries = {}
	summaries.data = []
	summaries.meta = {"collection":"Summaries", "headers" : ["Summary"]}

	data.forEach(function(entry){
		summaries.data.push([entry.summary])
	})
	callback(summaries, dest, cb)
}
