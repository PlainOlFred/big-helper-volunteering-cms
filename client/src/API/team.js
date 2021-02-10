import axios from "axios";
// import { useProject } from "../App ";


const API = {
    getTeams: function () {
    return axios.get("/api/teams", {
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
    });
  },
  getTeamsOptions: function () {
    return axios.get("/api/teams", {
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      params: {
        simplified: 1
      }
    });
  },

}


export default API