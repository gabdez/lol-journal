const url_prefix = "https://euw1.api.riotgames.com/";

export default {
  async getSummoner(summonerName) {
    const Http = new XMLHttpRequest();
    const url =
      url_prefix + "/lol/summoner/v4/summoners/by-name/" + summonerName;
    return new Promise((resolve, reject) => {
      Http.open("GET", url);
      Http.setRequestHeader(
        "X-Riot-Token",
        "RGAPI-7357e387-36f6-49a3-ba0c-9cc2f31eef52"
      );
      Http.send();

      Http.onreadystatechange = function() {
        console.log(this.responseText);
        if (this.status == 200) {
          resolve(this.responseText);
        } else {
          reject(new Error("GetSummoner Error"));
        }
      };
    });
  }
};
