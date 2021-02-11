const PATCH = "11.3.1";
const HOST = "http://ddragon.leagueoflegends.com/cdn/";
export default {
  data: function() {
    return {
      summonerIconPath: HOST + PATCH + "/img/profileicon/{iconId}.png",
      summonerSpellIconPath:
        HOST + PATCH + "/img/spell/{summonerSpellName}.png",
      itemIconPath: HOST + PATCH + "/img/item/{itemId}.png",
      champIconPath: HOST + PATCH + "/img/champion/{champName}.png"
    };
  },
  methods: {
    $_getSummonerIcon(iconId) {
      return this.summonerIconPath.replace("{iconId}", iconId);
    },
    $_getSummonerSpellIcon(summonerSpellName) {
      return this.summonerSpellIconPath.replace(
        "{summonerSpellName}",
        summonerSpellName
      );
    },
    $_getItemIcon(itemId) {
      return this.itemIconPath.replace("{itemId}", itemId);
    },
    $_getChampIcon(champName) {
      return this.champIconPath.replace("{champName}", champName);
    }
  }
};
