var express = require('express');
var router = express.Router();
var { PythonShell } = require('python-shell');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        drinks: global.DRINKS
    });
});

router.post('/', function (req, res, next) {
    global.state = "Busy";
    global.curr_drink = req.body.drink;
    let pyshell = new PythonShell('server/node_tests.py');
    pyshell.send(req.body.drink);
    res.render('index', {
        drinks: global.DRINKS
    });
    pyshell.on('message', function (message) {
        global.state = "Idle";
        delete global.curr_drink;
    });
});

module.exports = router;