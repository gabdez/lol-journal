const url_prefix = "http://localhost:3000/";

export default {
  async getSummoner(summonerName) {
    const Http = new XMLHttpRequest();
    const url = url_prefix + "getSummoner/" + summonerName;
    return new Promise((resolve, reject) => {
      Http.open("GET", url);

      // wait for response to be receive
      Http.onload = function() {
        if (this.status == 200) {
          resolve(JSON.parse(this.response));
        } else {
          reject(new Error("GetSummoner Error"));
        }
      };
      Http.send();
    });
  },
  async getSummonerLeagueInfo(summonerId) {
    const Http = new XMLHttpRequest();
    const url = url_prefix + "getSummonerLeagueInfo/" + summonerId;
    return new Promise((resolve, reject) => {
      Http.open("GET", url);

      // wait for response to be receive
      Http.onload = function() {
        if (this.status == 200) {
          resolve(JSON.parse(this.response));
        } else {
          reject(new Error("GetSummonerLeagueInfo Error"));
        }
      };
      Http.send();
    });
  },
  async getSummonerMatchList(accountId, beginIndex = 0, endIndex = 10) {
    const Http = new XMLHttpRequest();
    const url =
      url_prefix +
      "getSummonerMatchList/" +
      accountId +
      "&" +
      beginIndex +
      "&" +
      endIndex;
    return new Promise((resolve, reject) => {
      Http.open("GET", url);

      // wait for response to be receive
      Http.onload = function() {
        if (this.status == 200) {
          resolve(JSON.parse(this.response));
        } else {
          reject(new Error("GetSummonerMatchList Error"));
        }
      };
      Http.send();
    });
  }
};
