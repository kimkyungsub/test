const fs = require('fs');
// Sync
console.log(1);
var data = fs.readFileSync('underscore.js', {encoding:'utf8'});
console.log(data);
// aSync
console.log(2);
var data = fs.readFile('underscore.js', {encoding:'utf8'}, function(err, data){
  console.log(data);
});
console.log(data);
