const express = require("express");
const app = new express();
const path = require("path");
let {PythonShell} = require('python-shell');
let pyshell = new PythonShell('node_tests.py');

app.use(express.static("public"));

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
})

app.get('test.txt', (req, res) => {
    pyshell.send(btn);
    console.log("got request!");
})

var port = 8000;
app.listen(port, () => console.log('Application listening on port ' + port + '!'));