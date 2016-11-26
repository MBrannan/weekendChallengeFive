var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/employees';

router.get('/', function(req, res) {
  console.log('get request');
});

module.exports = router;
