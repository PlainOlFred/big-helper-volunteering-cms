const router = require("express").Router();
const connection = require("../../db/connection");

router.get("/", function (req, res) {
  
  connection.query(
  `SELECT 
	  p.id, 
    p.name, 
    c.name charity_name,
    c.email charity_email,
    p.date_started dateStarted,
    p.date_completed dateCompleted,
    p.date_target dateTarget,
    t.total_task,
    t.assigned_task,
    t.completed_task,
    t.in_progress_task,
    t.in_review_task
    
  FROM project p 
  LEFT JOIN charity c ON c.charity_id = p.charity_charity_id
  LEFT JOIN (
	  SELECT 
		  project_id,
        count(*) total_task, 
        count(if(status='ASSIGNED',1,null)) assigned_task,
        count(if(status='COMPLETED',1,null)) completed_task,
        count(if(status='IN PROGRESS', 1, null)) in_progress_task,
        count(if(status='IN REVIEW', 1, null)) in_review_task
      FROM task GROUP BY project_id) t on t.project_id = p.id
  
  ;`,
    function (err, results, fields) {
      console.log(results); // results contains rows returned by server
      res.json(results);
    }
  );
});

router.post("/", function (req, res) {
  const {data: project} = req.body;
  console.log("creating", project)

  connection.query(
    `INSERT INTO project (
      name, 
      date_started, 
      date_target, 
      date_completed, 
      description, 
      charity_charity_id, 
      team_team_id
      ) VALUES (?,?,?,?,?,?,?);`,
      [project.name,
        '2020-2-2',
        null,
        null,
        "default",
        project.charity,
        1],
    function (err, results, fields) {
      if(err) throw err;
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
