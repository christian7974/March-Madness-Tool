const express = require('express');

const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.set('view engine', 'ejs');
app.get("/", function(req, res) {
    res.render("index");
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

                team1pointsPG: firstTeam.pointsPG,
                team2pointsPG: secondTeam.pointsPG,

                team1fieldGoalsMadePG: firstTeam.fieldGoalsMadePG,
                team2fieldGoalsMadePG: secondTeam.fieldGoalsMadePG,

                team1fieldGoalsAttPG: firstTeam.fieldGoalsAttPG,
                team2fieldGoalsAttPG: secondTeam.fieldGoalsAttPG,

                team1FGPercent: firstTeam.FGPercent,
                team2FGPercent: secondTeam.FGPercent,

                team1threePointMadePG: firstTeam.threePointMadePG,
                team2threePointMadePG: secondTeam.threePointMadePG,

                team1threePointAttPG: firstTeam.threePointAttPG,
                team2threePointAttPG: secondTeam.threePointAttPG,

                team1threePointPercent: firstTeam.threePointPercent,
                team2threePointPercent: secondTeam.threePointPercent,

                team1freeThrowMadePG: firstTeam.freeThrowMadePG,
                team2freeThrowMadePG: secondTeam.freeThrowMadePG, 

                team1freeThrowAttPG: firstTeam.freeThrowAttPG,
                team2freeThrowAttPG: secondTeam.freeThrowAttPG, 

                team1freeThrowPercent: firstTeam.freeThrowPercent,
                team2freeThrowPercent: secondTeam.freeThrowPercent,

                team1offReboundsPG: firstTeam.offReboundsPG,
                team1offReboundsPG: firstTeam.offReboundsPG,

                team1defReboundsPG: firstTeam.defReboundsPG,
                team1defReboundsPG: firstTeam.defReboundsPG,

                team1totalReboundsPG: firstTeam.totalReboundsPG,
                team2totalReboundsPG: secondTeam.totalReboundsPG,

                team1assistsPG: firstTeam.assistsPG,
                team2assistsPG: secondTeam.assistsPG,

                team1stealsPG: firstTeam.stealsPG,
                team2stealsPG: secondTeam.stealsPG,

                team1blocksPG: firstTeam.blocksPG,
                team2blocksPG: secondTeam.blocksPG,

                team1turnoversPG: firstTeam.turnoversPG,
                team2turnoversPG: secondTeam.turnoversPG,

                teamStats: ["pointsPG", "fieldGoalsMadePG", "fieldGoalsAttPG", "FGPercent", "threePointMadePG", 
                "threePointAttPG", "threePointPercent", "freeThrowMadePG", "freeThrowAttPG", "freeThrowPercent", "offReboundsPG", 
                "defReboundsPG", "totalReboundsPG", "assistsPG", "stealsPG", "blocksPG", "turnoversPG"]
            });
        });
    });
    
});

app.listen(3000, function() {
    console.log("The server is now running on Port 3000");
});