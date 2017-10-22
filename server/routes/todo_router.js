var express = require('express');
var router = express.Router();
var tasks = [];

var pg = require('pg');
var config = {
    database: 'deneb',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
}

//create pool
var pool = new pg.Pool(config);

//GET route
router.get('/', function (req, res){
    //attempt to connect to db
    pool.connect(function (errorConnectingToDb, db, done) {
        if(errorConnectingToDb) {
            //error, no connection was made
        console.log('Error connecting', errorConnectingToDb);
        res.sendStatus(500);
        } else {
            //successfully connected to db, pool -1
            var queryText = 'SELECT * FROM "tasks";';
            db.query(queryText, function (errorMakingQuery, result){
               //We have recieved an error or result at this point
               done(); //pool +1
               if (errorMakingQuery) {
                   console.log('Error making query', errorMakingQuery);
                   res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            }); // END QUERY
        }
    }); //END POOL
}); // END GET ROUTE

//POST ROUTE

module.exports = router;