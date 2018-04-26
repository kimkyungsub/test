module.exports = function(app){
  app.get('/p2/r1', function(req, res){
    res.send('Hello /p2/r1');
  });
  app.get('/p2/r2', function(req, res){
    res.send('Hello /p2/r2');
  });
}
