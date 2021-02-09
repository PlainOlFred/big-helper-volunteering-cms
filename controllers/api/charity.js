const router = require("express").Router();
const connection = require("../../db/connection");


router.get("/", function(req, res){
    console.log("bofore connection")
    connection.query(
        `SELECT
            c.charity_id,
            c.name,
            c.email
        FROM charity c ;
        `,
        function(err, results, fields) {
            console.log(results);
            res.json(results)
        }
    )
})


module.exports = router;