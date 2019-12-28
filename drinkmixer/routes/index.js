var express = require('express');
var router = express.Router();
var {PythonShell} = require('python-shell');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  let pyshell = new PythonShell('server/node_tests.py');
  pyshell.send(req.body.drink);
  res.render('drink', { drink: req.body.drink });
});

module.exports = router;
