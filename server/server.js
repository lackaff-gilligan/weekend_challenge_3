var express = require('express');
var app = express();
var port = 5000;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));


var todoRouter = require('./routes/todo_router.js');
app.use('/tasks', todoRouter);

app.use(express.static('server/public'));

app.listen(port, function(){
    console.log('Server running on port: ', port);  
});