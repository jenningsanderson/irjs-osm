module.exports = function (data){
  console.log("should be querying here")
  client.search({
    q: 'title',
  }).then(function (body) {
    console.log(body.hits)
  }, function (error) {
      console.trace(error.message);
  });
}
