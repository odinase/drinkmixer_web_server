const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
let {PythonShell} = require('python-shell');

const app = new express();
let pyshell = new PythonShell('node_tests.py');
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.static("public"));

app.get('/test', (req, res) => {
    // Call your python script here.
    // I prefer using spawn from the child process module instead of the Python shell
    const scriptPath = 'public/node_tests.py'
    const process = spawn('python', [scriptPath, 'h'])
    process.stdout.on('data', (myData) => {
        // Do whatever you want with the returned data.
        // ...
        res.send("Done!")
    })
    process.stderr.on('data', (myErr) => {
        // If anything gets written to stderr, it'll be in the myErr variable
    })
});

app.get('/', (req, res) => {
    res.render('public/index.ejs', null);
});

app.post('/gintonic', (res, req) => {

});

var port = 8000;
app.listen(port, () => console.log('Application listening on port ' + port + '!'));