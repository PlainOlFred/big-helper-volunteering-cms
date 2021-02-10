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
    return axios.post("/api/projects", {
      data: body,
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
    });  
  },

  getProjectById: function(id) {
    return axios.get(`/api/projects/${id}`, {
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    })
  }
}

export default API;
