const express = require('express');

const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

const globalStatEndings = ["PPG", "FGM", "FGA", "FG%", "3PM", 
"3PA", "3P%", "FTM", "FTA", "FT%", "OREB", 
"DREB", "RTB", "APG", "SPG", "BPG", "TOPG"]

app.set('view engine', 'ejs');
app.get("/", function(req, res) {
    res.render("index", {
        statEndings: globalStatEndings,
    });
});

app.post("/", function(req, res) {
    const team1 = req.body.team1;
    const team2 = req.body.team2;
    var firstTeam, secondTeam;
    const url = "https://college-basketball-api.onrender.com/teams/compare/" + team1 + "/" + team2;
    https.get(url, function(response) {
        response.on("data", function(data) {
            firstTeam = JSON.parse(data)[0];
            secondTeam = JSON.parse(data)[1];
            res.render("table", {
                team1Name: firstTeam.name,

                team2Name: secondTeam.name,

                statEndings: globalStatEndings,

                team1Stats: [firstTeam.pointsPG, firstTeam.fieldGoalsMadePG, firstTeam.fieldGoalsAttPG,
                    firstTeam.FGPercent, firstTeam.threePointMadePG, firstTeam.threePointAttPG, firstTeam.threePointPercent, firstTeam.freeThrowMadePG, 
                    firstTeam.freeThrowAttPG, firstTeam.freeThrowPercent, firstTeam.offReboundsPG, firstTeam.defReboundsPG, firstTeam.totalReboundsPG, firstTeam.assistsPG, 
                    firstTeam.stealsPG, firstTeam.blocksPG, firstTeam.turnoversPG],

                team2Stats: [secondTeam.pointsPG, secondTeam.fieldGoalsMadePG, secondTeam.fieldGoalsAttPG, secondTeam.FGPercent, secondTeam.threePointMadePG, 
                    secondTeam.threePointAttPG, secondTeam.threePointPercent, secondTeam.freeThrowMadePG, secondTeam.freeThrowAttPG, 
                    secondTeam.freeThrowPercent, secondTeam.offReboundsPG, secondTeam.defReboundsPG, secondTeam.totalReboundsPG, 
                    secondTeam.assistsPG, secondTeam.stealsPG, secondTeam.blocksPG, secondTeam.turnoversPG],

            });
        });
    });
});

app.listen(3000, function() {
    console.log("The server is now running on Port 3000");
});