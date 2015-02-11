//Users
module.exports = function (data, dest, callback) {

	var helpers = module.parent.exports.helpers
	
	var users = {}
	users.meta = {'collection':"Users", 'headers':['Username']}
	users.data = []

	data.forEach(function(entry){
		users.data.push( [ helpers.extractUser(entry) ] )
	})

	callback(users, dest)
}