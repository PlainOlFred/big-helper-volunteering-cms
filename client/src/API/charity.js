import axios from "axios";

const API = {
  getCharities: function () {
    return axios.get("/api/charity", {
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
    });
  },
  getCharityOptions: function () {
    return axios.get("/api/charity", {
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      params: {
        simplified: true
      }
    });
  },


};

export default API;
