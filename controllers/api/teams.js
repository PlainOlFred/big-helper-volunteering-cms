const router = require("express").Router();
const connection = require("../../db/connection");


router.get("/", function(req, res){
    console.log("route hit")
    let query = `SELECT
            t.team_id,
            t.name
        FROM team t;
        `;

    if (req.params.simplified) {
        console.log("new query")
        query = `SELECT
            t.team_id,
            t.name
        FROM team t;
        `
    }
    
    connection.query(
        query,
        function(err, results, fields) {
            if (err) throw err
            console.log("teams",results);
            res.status(200).json(results)
        }
    )
})


module.exports = router;