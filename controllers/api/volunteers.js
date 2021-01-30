const router = require("express").Router();
const connection = require("../../db/connection");

router.get("/", function (req, res) {
  connection.query(
    `SELECT volunteer.id, volunteer.first_name, volunteer.last_name  FROM volunteer`,
    function (err, results, fields) {
      
      res.json(results);
    }
  );
});

router.post("/", function (req, res) {
  const volunteer = req.body;

  connection.query(
    "INSERT INTO volunteer SET ?",
    volunteer,
    function (err, results, fields) {
      res.json(results);
    }
  );
});

router.delete("/", function (req, res) {
  const id = req.body.id;
  
  connection.query(
    `DELETE FROM volunteer WHERE id = ?`,
    id,
    function (err, results, fields) {
      res.json(results);
    }
  );
});


module.exports = router;
