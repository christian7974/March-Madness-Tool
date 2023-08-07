const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(3000, function() {
    console.log("The server is now running on Port 3000");
});