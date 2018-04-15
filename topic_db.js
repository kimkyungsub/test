var express = require('express');
var bodyParser = require('body-parser')
var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'wldms4fkd',
  database : 'myproject'
});
conn.connect();
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.locals.pretty = true;
app.set('views', './views_mysql');
app.set('view engine', 'jade');

app.get(['/topic', '/topic/:mode', '/topic/:mode/:id'], (req, res) => {
  var sql = 'SELECT * FROM topic';
  conn.query(sql, function(err, topics, fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    var id = req.params.id;
    var mode = req.params.mode;
    if(mode == 'add') {
      res.render('view', {topics: topics, mode: mode});
    } else if(id) {
      if(mode == 'delete') {
        sql = 'DELETE FROM topic WHERE uid=?';
        conn.query(sql, [id], function(err, topic, fields){
          if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
          }
          console.log(topic + mode);
          res.redirect('/topic');
        });
      } else {
        sql = 'SELECT * FROM topic WHERE uid=?';
        conn.query(sql, [id], function(err, topic, fields){
          if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
          }
          console.log(topic + mode);
          res.render('view', {topics: topics, mode: mode, topic: topic[0]});
        });
      }
    } else {
      res.render('view', {topics: topics, mode: 'list'});
    }
  });
});
app.post(['/topic/:mode', '/topic/:mode/:id'], (req, res) => {
  var mode= req.params.mode;
  var id = req.params.id;
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  if(mode == 'add') {
    sql = 'INSERT INTO topic (title, description, author) VALUES (?, ?, ?)';
    conn.query(sql, [title, description, author], function(err, topic, fields){
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
      id = topic.insertId;
    });
  } else if(mode == 'edit') {
    sql = 'UPDATE topic SET title=?, description=?, author=? WHERE uid=?';
    conn.query(sql, [title, description, author, id], function(err, topic, fields){
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
    });
  }
  res.redirect('/topic/view/'+id);
});
app.listen(3000, function(){
  console.log('Connected, 300 port!');
});
