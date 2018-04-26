var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'SDGRKH;S42',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}));

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
        <input type='password' name='password' placeholder='password'>
      </p>
      <p>
        <input type='submit'>
      </p>
    </form>
    <a href="/auth/facebook">facebook</a>
  `;
  res.send(output);
});
/*
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
    req.session.save(() => {
      res.redirect('/welcome');
    });
  } else {
    res.send('Who are you? <a href="/auth/login">login</a>');
  }
});
*/
var users = [{
  username: 'kskim',
  password: '1111',
  displayName: 'Kyungsub'
}];

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
    for(var i in users) {
      var user = users[i];
      if (username === user.username && password === user.password) {
        console.log('LocalStrategy2', user);
        done(null, user);
      } else {
        done(null, false);
      }
    }
    done(null, false);
  }
));

passport.use(new FacebookStrategy({
    clientID: '373528319818895',
    clientSecret: '357af47c1ab58aaecc0a0b14b1ab8149',
    callbackURL: "/auth/faceboot/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    // User.findOrCreate(..., function(err, user) {
    //   if (err) { return done(err); }
    //   done(null, user);
    // });
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

app.get(
  '/auth/facebook',
  passport.authenticate(
    'facebook'
  )
);

app.get(
  '/auth/facebook/callback',
  passport.authenticate(
    'facebook',
    {
      successRedirect: '/welcome',
      failureRedirect: '/auth/login'
    }
  )
);

app.get('/auth/logout', (req, res) => {
  req.logout();
  res.redirect('/welcome');
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
