module.exports = function(app){
  app.get('/p1/r1', function(req, res){
    res.send('Hello /p1/r1');
  });
  app.get('/p1/r2', function(req, res){
    res.send('Hello /p1/r2');
  });
};
