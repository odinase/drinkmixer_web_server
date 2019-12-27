const express = require("express");
const app = new express();
const path = require("path");

app.use(express.static("public"));
var port = 8000;
app.listen(port, () => console.log('Application listening on port ' + port + '!'));