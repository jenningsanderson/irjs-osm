module.exports = function (client, query){
  client.search({
    q: query,
  }).then(function (body) {
    console.log(body.hits)
  }, function (error) {
      console.trace(error.message);
  });
}
