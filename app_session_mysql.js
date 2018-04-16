var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'wldms4fkd',
    database: 'myproject'
};

app.use(session({
  secret: 'SDGRKH;S42',
  resave: false,
  saveUninitialized: true,
  store: new MySQLStore(options)
}));

var users = [
  {
    username: 'kskim1',
    password: '1111',
    displayName: 'Kyungsub1'
  },{
    username: 'kskim2',
    password: '2222',
    displayName: 'Kyungsub2'
  }
];

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
  var uname = req.body.username;
  var pwd = req.body.password;
  var user;
  var pass = false;
  for (var i in users) {
    user = users[i];
    console.log(user);
    if (uname === user.username && pwd === user.password) {
      req.session.displayName = user.displayName;
      req.session.save(() => {
        res.redirect('/welcome');
      });
      pass = true;
      break;
    }
  }
  if (!pass) res.send('Who are you? <a href="/auth/login">login</a>');
});

app.get('/auth/logout', (req, res) => {
    delete req.session.displayName;
    req.session.save(() => {
      res.redirect('/welcome');
    });
});

app.get('/auth/register', (req, res) => {
  var output = `
    <h1>Register</h1>
    <form action='/auth/register' method='post'>
      <p>
        <input type='text' name='username' placeholder='username'>
      </p>
      <p>
        <input type='password' name='password' placeholder='pssword'>
      </p>
      <p>
        <input type='text' name='displayName' placeholder='displayName'>
      </p>
      <p>
        <input type='submit'>
      </p>
    </form>
  `;
  res.send(output);
});

app.post('/auth/register', (req, res) => {
  var uname = req.body.username;
  var pwd = req.body.password;
  var dname = req.body.displayName;
  var user;
  var pass = true;

  for (var i in users) {
    user = users[i];
    if (uname === user.username) {
      pass = false;
      break;
    }
  }

  if (!pass) {
    res.send(uname+'은 사용하고 있는 username 입니다. <a href="/auth/register">register</a>');
  } else {
    user = {
      username: uname,
      password: pwd,
      displayName: dname
    };
    users.push(user);
    res.redirect('/auth/login');
  }
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
      <ul>
        <li><a href="/auth/login">Login</a></li>
        <li><a href="/auth/register">Register</a></li>
      </ul>
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
