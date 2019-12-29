var express = require('express');
var router = express.Router();
var { PythonShell } = require('python-shell');
global.state = "Idle";

/* GET home page. */
router.get('/', function(req, res, next) {
    if (global.state == "Idle") {
        res.render('index');
    } else {
        res.render('busy');
    }
});

router.post('/', function(req, res, next) {
    if (global.state == "Idle") {
        global.state = "Busy";
        global.curr_drink = req.body.drink;
        console.log(req.body);
        let pyshell = new PythonShell('server/node_tests.py');
        pyshell.send(req.body.drink);
        res.render('index', {
            drink: global.curr_drink,
            state: global.state
        });
        pyshell.on('message', function(message) {
            global.state = "Idle";
            delete global.curr_drink;
        });
    } else {
        res.render('busy');
    }
});

module.exports = router;