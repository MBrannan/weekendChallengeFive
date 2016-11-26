var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var employees = require('./routes/employees');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/employees', employees);

app.use(express.static(path.resolve('./server/public')));

app.get('/home', function(req, res) {
  res.send('server says hello');
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});

app.listen(9000, function() {
  console.log("server running on local host 9000");
});
