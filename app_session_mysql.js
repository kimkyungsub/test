var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var sha256 = require('sha256');
var MySQLStore = require('express-mysql-session')(session);
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;

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

var salt = '@#$%^dsfjdlkjd';
var users = [
  {
    username: 'kskim1',
    password: 'daef95c2270bc3bd1de8b8a5ee6d7dc82073e246b4ada0bcbfe3f896f567923c',
    displayName: 'Kyungsub1'
  }
];

app.use(passport.initialize());
app.use(passport.session());

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

passport.serializeUser(function(user, done) {
  console.log('serializeUser2', user);
  done(null, user.username);
});

passport.deserializeUser(function(id, done) {
  console.log('deserializeUser2', id);
  for(var i in users) {
    var user = users[i];
    if (user.username === id) {
      done(null, user);
    }
  }
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    var uname = username;
    var pwd = password;
    var user;
    var pass = false;
    for (var i in users) {
      user = users[i];
      console.log(user);
      if (uname === user.username && sha256(pwd+salt) === user.password) {
        console.log('LocalStrategy2', user);
        done(null, user);
        pass = true;
        break;
      }
    }
    if (!pass) done(null, false);
  }
));

app.post(
  '/auth/login',
  passport.authenticate(
    'local',
    {
      successRedirect: '/welcome',
      failureRedirect: '/auth/login',
      failureFlash: false
   }
 )
);

app.get('/auth/logout', (req, res) => {
  req.logout();
  req.session.save(function() {
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
      password: sha256(pwd+salt),
      displayName: dname
    };
    users.push(user);
    req.login(user, function(err) {
      req.session.save(function() {
        res.redirect('/welcome');
      });
    });
  }
});

app.get('/welcome', (req,res) => {
  if (req.user && req.user.displayName) {
    res.send(`
      <h1>Hello, ${req.user.displayName}</h1>
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
