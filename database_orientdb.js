var OrientDB = require('orientjs');

var server = OrientDB({
   host:       'localhost',
   port:       2424,
   username:   'root',
   password:   'wldms4fkd'
});

var db = server.use('o2');
/*
db.record.get('#20:0').then(function (record) {
  console.log('Loaded record:', record.title);
});

var sql = 'SELECT * FROM topic WHERE @rid=:rid';
var param = {
  params:{
    rid:'#20:0'
  }
};
db.query(sql, param).then(function(results){
  console.log(results);
});

var sql = 'INSERT INTO topic (title, description) VALUES (:title, :desc)';
var param = {
  params:{
    title: 'Express',
    desc: 'Express is framwork for web'
  }
};
db.query(sql, param).then(function(results){
  console.log(results);
});

var sql = 'UPDATE topic SET title=:title WHERE @rid=:rid';
db.query(sql, {params:{title:'Expressjs', rid:'#18:1'}}).then(function(results){
  console.log(results);
});

var sql = 'DELETE FROM topic WHERE @rid=:rid';
db.query(sql, {params:{rid: '#18:1'}}).then(function(results){
  console.log(results);
});
*/
