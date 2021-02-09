import axios from "axios";

const API = {
  getProjects: function () {
    return axios.get("/api/projects", {
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
    });
  },

  createNewProject: function (body) {
    console.log("create axios")
    return axios.post("/api/projects", {
      data: body,
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
    });  
  },
};

export default API;
