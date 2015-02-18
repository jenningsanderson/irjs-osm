module.exports = function (client, type, document){

  client.create({
      index: 'irosm',
      type: type,
      //id: '1',
      body: document
  }, function (error, response) {
      console.log(error)
  });
}
