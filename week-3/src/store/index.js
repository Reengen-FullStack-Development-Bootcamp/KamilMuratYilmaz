import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    companyKeyword: "",
    companySymbol: null,
    searchResults: [],
    apiURL: "https://alpha-vantage.p.rapidapi.com/query",
    headers: {
      "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
      "x-rapidapi-key": "5d3b9dd928mshd83e4ca030f3034p1e932ejsnaece4d46d226",
    },
    timeSeries: "TIME_SERIES_DAILY",
    timeSeriesTypeData: null,
    marketData: [],
    routeTrack: [],
    alertStatus: false,
  },
  mutations: {
    SET_MARKET_SEARCH_RESULT(state, companyNameSymbol) {
      state.searchResults = companyNameSymbol;
    },
    SET_COMPANY_KEYWORD(state, keyword) {
      state.companyKeyword = keyword;
    },
    SET_COMPANY_SYMBOL(state, companySymbolFromID) {
      state.companySymbol = companySymbolFromID;
    },
    SET_MARKET_DATA(state, seriesData) {
      state.marketData = seriesData;
    },
    SET_TIME_SERIES(state, timeSeriesType) {
      state.timeSeries = timeSeriesType;
      switch (timeSeriesType) {
        case "TIME_SERIES_DAILY":
          return (state.timeSeriesTypeData = "Time Series (Daily)");
        case "TIME_SERIES_WEEKLY":
          return (state.timeSeriesTypeData = "Weekly Time Series");
        case "TIME_SERIES_MONTHLY":
          return (state.timeSeriesTypeData = "Monthly Time Series");
      }
    },
    TRACK_ROUTE(state, route) {
      state.routeTrack.push(route);
    },
    ALERT(state, status) {
      state.alertStatus = status;
    },
  },
  actions: {
    getCompanySearchResult({ state, commit }) {
      commit("SET_MARKET_SEARCH_RESULT", []);
      return axios
        .get(`${state.apiURL}`, {
          headers: { ...state.headers },
          params: {
            keywords: `${state.companyKeyword}`,
            function: "SYMBOL_SEARCH",
            datatype: "json",
          },
        })
        .then((res) => {
          let apiData = res.data["bestMatches"];
          let companyNameSymbol = [];
          apiData.forEach((apiData) => {
            let obj = new Object({
              name: apiData["2. name"],
              symbol: apiData["1. symbol"],
            });
            companyNameSymbol.push(obj);
          });
          commit("SET_MARKET_SEARCH_RESULT", companyNameSymbol.slice(0, 5));
          console.log(state.searchResults);
        })
        .catch((err) => {
          console.error(err);
          alert(
            "You have reached API request limit, please try again after 1 minute"
          );
        });
    },
    getTimeSeriesData({ state, commit }) {
      commit("SET_MARKET_DATA", []);
      return axios
        .get(`${state.apiURL}`, {
          headers: { ...state.headers },
          params: {
            function: `${state.timeSeries}`,
            symbol: `${state.companySymbol}`,
            outputsize: "compact",
            datatype: "json",
          },
        })
        .then((res) => {
          let apiData = res.data[state.timeSeriesTypeData];
          let seriesData = [];
          Object.keys(apiData).forEach((item) => {
            let obj = new Object({
              date: item,
              open: apiData[item]["1. open"],
              high: apiData[item]["2. high"],
              low: apiData[item]["3. low"],
              close: apiData[item]["4. close"],
              volume: apiData[item]["5. volume"],
            });
            seriesData.push(obj);
          });
          seriesData = seriesData.slice(0, 100);
          commit("SET_MARKET_DATA", seriesData);
        })
        .catch((err) => {
          console.error(err);
          alert(
            "You have reached API request limit, please try again after 1 minute"
          );
        });
    },
    companySymbolFromID({ commit }, id) {
      let companySymbolFromID = id;
      commit("SET_COMPANY_SYMBOL", companySymbolFromID);
    },
    timeSeriesType({ commit }, input) {
      let timeSeriesType = input;
      commit("SET_TIME_SERIES", timeSeriesType);
    },
  },
  getters: {},
  modules: {},
});
