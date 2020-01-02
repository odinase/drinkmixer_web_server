var express = require('express');
var router = express.Router();
var { PythonShell } = require('python-shell');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('init', {
        page: 'init',
        drinks: global.DRINKS
    });
});

router.post('/', function (req, res, next) {
    global.state = "Init";
    delete global.curr_drink;
    let pyshell = new PythonShell('server/node_tests.py');
    pyshell.send("Test init");
    res.render('init', {
        page: 'init',
        drinks: global.DRINKS
    });
    pyshell.on('message', function (message) {
        console.log(message);
        global.state = "Idle";
        delete global.curr_drink;
    });
});

module.exports = router;