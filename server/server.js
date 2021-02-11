const express = require("express");
const https = require("https");
const cors = require("cors");
const app = express();
const port = 3000;
const token = require("./constants/apikey.js");

app.use(cors());

const GETOptions = {
  hostname: "euw1.api.riotgames.com",
  path: "pathToDefine",
  method: "GET",
  headers: {
    "X-Riot-Token": token.API_KEY
  }
};

app.get("/getSummoner/:summonerName", (req, res) => {
  GETOptions.path =
    "/lol/summoner/v4/summoners/by-name/" + req.params.summonerName;

  const call = https.request(GETOptions, calRes => {
    console.log(`statusCode: ${calRes.statusCode}`);
    res.statusCode = calRes.statusCode;

    calRes.on("data", d => {
      process.stdout.write(d);
      res.send(d);
    });
  });

  call.on("error", error => {
    console.error(error);
  });

  call.end();
});

app.get("/getSummonerLeagueInfo/:summonerId", (req, res) => {
  GETOptions.path =
    "/lol/league/v4/entries/by-summoner/" + req.params.summonerId;

  const call = https.request(GETOptions, calRes => {
    console.log(`statusCode: ${calRes.statusCode}`);
    res.statusCode = calRes.statusCode;

    calRes.on("data", d => {
      process.stdout.write(d);
      res.send(d);
    });
  });

  call.on("error", error => {
    console.error(error);
  });

  call.end();
});
/* eflt0vXyJEkN5IUKAfTi51VGhbmsseojvR-O251Ct9Uvxbk?queue=420&endIndex=10&beginIndex=0 */
app.get(
  "/getSummonerMatchList/:accountId&:beginIndex&:endIndex",
  (req, res) => {
    console.log(req.params);
    GETOptions.path =
      "/lol/match/v4/matchlists/by-account/" +
      req.params.accountId +
      "?queue=420&endIndex=" +
      req.params.endIndex +
      "&beginIndex=" +
      req.params.beginIndex;
    console.log(GETOptions.path);

    const call = https.request(GETOptions, calRes => {
      console.log(`statusCode: ${calRes.statusCode}`);
      res.statusCode = calRes.statusCode;

      calRes.on("data", d => {
        res.send(d);
      });
    });

    call.on("error", error => {
      console.error(error);
    });

    call.end();
  }
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
