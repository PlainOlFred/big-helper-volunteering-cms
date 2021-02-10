const router = require("express").Router();
const { v4: uuid } = require("uuid");

const connection = require("../../db/connection");

router.post("/", function (req, res) {
  const body = req.body;
  const id = uuid();

  connection.query(
    `INSERT INTO task (
            task_id, 
            project_id, 
            volunteer_id, 
            status,
            title,  
            description
            ) VALUES (?,?,?,?,?,?)
        ) ;`,
    [id],
    function (err, results, fields) {
      if (err) throw err;

      console.log("created", results);
      res.json({ id, ...project });
    }
  );
});

module.exports = router;
