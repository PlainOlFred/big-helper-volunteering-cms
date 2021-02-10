const router = require("express").Router();
const connection = require("../../db/connection");


router.get("/", function(req, res){
    let query = `SELECT
            c.charity_id,
            c.name,
            c.email
        FROM charity c ;
        `;

    if (req.params.simplified) {
        query = `SELECT c.charity_id, c.name FROM charity c `
    }
    
    connection.query(
        query,
        function(err, results, fields) {
            console.log(results);
            res.json(results)
        }
    )
})


module.exports = router;