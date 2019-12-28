function pressBtn(btn) {
    console.log('Pushed button!');
    var buttons = document.getElementById(btn);
    if (buttons.innerHTML == "Hey!") {
        buttons.innerHTML = "Press meg!";
    } else {
        buttons.innerHTML = "Hey!";
    }
}

function launchPython(btn) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "test.txt", true);
    xhttp.send();
}