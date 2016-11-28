var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/employees';

router.get('/', function(req, res) {
  console.log('get request');

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query('SELECT * FROM employees', function (err, result) {
      done();
      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }
      res.send(result.rows);
      console.log(result.rows);
    });
  });
});

router.post('/', function(req, res) {
  var newEmployee = req.body;
  console.log('post request');

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error ', err);
      res.sendStatus(500);
    }
    console.log(newEmployee);
    client.query('INSERT INTO employees (first_name, last_name, idNumber, title, salary)' +
      'VALUES ($1, $2, $3, $4, $5)',
      [newEmployee.first_name, newEmployee.last_name, newEmployee.idNumber, newEmployee.title, newEmployee.salary],
      function(err, result) {
        done();

        if(err) {
          console.log('insert query error: ', err)
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
    });
  });
});

router.delete('/:id', function(req, res) {
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query('DELETE FROM employees WHERE id = $1',
      [req.params.id],
      function(err, result) {
        done();
        if (err) {
          console.log('deletion error: ', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      }
    );
  });
});

module.exports = router;
