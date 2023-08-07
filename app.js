const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    const team1 = req.body.team1;
    const team2 = req.body.team2;
    res.write(team1);
    res.write(" " + team2);
    res.send();

});

app.listen(3000, function() {
    console.log("The server is now running on Port 3000");
});