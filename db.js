var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'wldms4fkd',
  database : 'myproject'
});

conn.connect();
/*
var sql = 'SELECT * FROM topic';
conn.query(sql, function(err, rows, fields){
  if(err){
    console.log(err);
  } else {
    for(var i=0; i<rows.length; i++){
      console.log(rows[i].title);
    }
  }
});

var sql = "INSERT INTO topic (title, description, author) VALUES (?, ?, ?)";
var params = ['supervisor', 'Watcher', 'aidan'];
conn.query(sql, params, function(err, rows, fields){
  if(err){
    console.log(err);
  } else {
    console.log(rows.insertId);
  }
});

var sql = 'UPDATE topic SET title=?, author=? WHERE uid=?';
var params = ['NPM', 'seob2k', 1];
conn.query(sql, params, function(err, rows, fields){
  if(err){
    console.log(err);
  } else {
    console.log(rows);
  }
});
*/

var sql = 'DELETE FROM topic WHERE uid=?';
var params = [2];
conn.query(sql, params, function(err, rows, fields){
  if(err){
    console.log(err);
  } else {
    console.log(rows);
  }
});


conn.end();
