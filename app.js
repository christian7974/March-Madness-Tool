const express = require('express');

const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.set('view engine', 'ejs');
app.get("/", function(req, res) {
    res.render("table", {
        team1Name: "Team1",
        team2Name: "Team2",

        team1Points: "Team1",
        team2Points: "Team2",

        team1TotalReb: "Team1",
        team2TotalReb: "Team2",
        
        team13PP: "Team1",
        team23PP: "Team2",
    });
});

app.post("/", function(req, res) {

    const team1 = req.body.team1;
    const team2 = req.body.team2;
    var firstTeam, secondTeam;
    const url = "https://college-basketball-api.onrender.com/teams/compare/" + team1 + "/" + team2;
    https.get(url, function(response) {
        response.on("data", function(data) {
            // console.log(JSON.parse(data));
            firstTeam = JSON.parse(data)[0];
            secondTeam = JSON.parse(data)[1];
            res.render("table", {
                team1Name: firstTeam.name,
                team2Name: secondTeam.name,

                team1Points: firstTeam.pointsPG ,
                team2Points: secondTeam.pointsPG,

                team1TotalReb: firstTeam.totalReboundsPG,
                team2TotalReb: secondTeam.totalReboundsPG,

                team13PP: firstTeam.threePointPercent,
                team23PP: secondTeam.threePointPercent,
            });
        });
    });
    
});

app.listen(3000, function() {
    console.log("The server is now running on Port 3000");
});