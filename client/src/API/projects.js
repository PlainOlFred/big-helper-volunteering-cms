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

  createNewProject: function () {
    
  },
};

export default API;
