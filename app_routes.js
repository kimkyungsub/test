var express = require('express');
var app = express();

require('./routes/p1')(app);
require('./routes/p2')(app);

app.listen(3003, function(){
  console.log('Connected 3003 port');
});
