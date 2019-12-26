const express = require("express");
const app = new express();
const path = require("path");

app.use(express.static("public"));
app.listen(8000);