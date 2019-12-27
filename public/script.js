var runPy = new Promise(function(success, nosuccess) {

    const { spawn } = require('child_process');
    const pyprog = spawn('python', ['node_tests.py', "test"]);

    pyprog.stdout.on('data', function(data) {
        
        success(data);
    });

    pyprog.stderr.on('data', (data) => {
        
        nosuccess(data);
    });
});

function pressBtn(btn) {
    var buttons = document.getElementById(btn);
    if (buttons.innerHTML == "Hey!") {
        buttons.innerHTML = "Press meg!";
    } else {
        buttons.innerHTML = "Hey!";
    }
    runPy.then(function(fromRunpy) {
        console.log(fromRunpy.toString());
        res.end(fromRunpy);
    });
}