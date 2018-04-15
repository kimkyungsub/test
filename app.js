var express = require('express');
var app = express();
app.locals.pretty = true;
app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static('public'));
app.get('/topic', (req, res) => {
  var id = req.query.id || 0;
  var topics = [
    'Javascript is...',
    'Nodejs is...',
    'Express is...'
  ];
  var output = topics.map(function(item, index){
    return `<a href="/topic?id=${index}">${item}</a>`;
  }).join('<br>');
  output += `<h1>${topics[id]}</h1>`;
  res.send(output);
});
app.get('/supervisor', function(req, res){
  res.send('test');
});
app.get('/template', function(req, res){
  var time = Date();
  var title = 'Hello';
  res.render('temp', {time: time, title: title});
});
app.get('/route', function(req, res){
  res.send('Hello Route <img src="/test.png">');
});
app.get('/dynamic', function(req, res){
  var lis = '';
  for(var i=0; i<5; i++){
    lis += '<li>coding</li>';
  }
  var date = Date();
  var output = `
  <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title></title>
      </head>
      <body>
          Hello, Dynamic!
          <ul>
          ${lis}
          </ul>
          ${date}
      </body>
    </html>
  `;
  res.send(output);
});
app.get('/', function(req, res){
  res.send('Hello home page');
});
app.get('/login', function(req, res){
  res.send('<h1>Login please</h1>');
});
app.listen(3000, function(){
  console.log('Connect 300 port!');
});
