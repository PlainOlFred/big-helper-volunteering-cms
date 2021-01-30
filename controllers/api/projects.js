const router = require("express").Router();
const connection = require("../../db/connection");

router.get("/", function (req, res) {
  connection.query(
    `SELECT project.id, project.title FROM project`,
    function (err, results, fields) {
      console.log(results); // results contains rows returned by server
      res.json(results);
    }
  );
});

router.post("/", function (req, res) {
  const project = req.body;

  connection.query(
    "INSERT INTO project SET ?",
    project,
    function (err, results, fields) {
      res.json(results);
    }
  );
});

router.delete("/", function (req, res) {
  const id = req.body.id;
  
  connection.query(
    `DELETE FROM project WHERE id = ?`,
    id,
    function (err, results, fields) {
      res.json(results);
    }
  );
});

router.put("/update-project-title", function(req, res) {
    const {project_id, title} = req.body


    connection.query(
      "UPDATE project SET title = ? WHERE id = ?",
      [title, project_id], function(err, results, fields) {

          res.json(results)
      }
    );
});



router.put("/add-team-lead", function(req, res) {

});

router.put("/remove-team-lead", function(req, res) {

});

module.exports = router;
