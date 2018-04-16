var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'SDGRKH;S42',
  resave: false,
  saveUninitialized: true
}));

app.get('/auth/login', (req, res) => {
  var output = `
    <h1>Login</h1>
    <form action='/auth/login' method='post'>
      <p>
        <input type='text' name='username' placeholder='username'>
      </p>
      <p>
        <input type='password' name='password' placeholder='pssword'>
      </p>
      <p>
        <input type='submit'>
      </p>
    </form>
  `;
  res.send(output);
});

app.post('/auth/login', (req, res) => {
  var user = {
    username: 'kskim',
    password: '1111',
    displayName: 'Kyungsub'
  };
  var uname = req.body.username;
  var pwd = req.body.password;
  if (uname === user.username && pwd === user.password) {
    req.session.displayName = user.displayName;
    res.redirect('/welcome');
  } else {
    res.send('Who are you? <a href="/auth/login">login</a>');
  }
});

app.get('/auth/logout', (req, res) => {
    delete req.session.displayName;
    res.redirect('/welcome');
});

app.get('/welcome', (req,res) => {
  if (req.session.displayName) {
    res.send(`
      <h1>Hello, ${req.session.displayName}</h1>
      <a href="/auth/logout">Logout</a>
    `);
  } else {
    res.send(`
      <h1>Welcome</h1>
      <a href="/auth/login">Login</a>
    `);
  }
});

app.get('/count', (req, res) => {
  req.session.count = req.session.count || 0;
  req.session.count++;
  res.send('count : '+req.session.count);
});

app.get('/tmp', (req, res) => {
    res.send('result : '+req.session.count);
});

app.listen(3003, () => {
  console.log('Connected 3003 port!!!');
});
