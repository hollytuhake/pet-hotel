var express = require('express');
var pg = require('pg');

var router = express.Router();
var config = {
    database: 'deneb',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeOutMillis: 30000
}
var pool = new pg.Pool(config);

//This GET route will get the pet names
router.get('/pet', function(req, res){
    pool.connect(function(errorConnectingtoDB, db, done){
        if(errorConnectingtoDB){
            conosle.log('error connecting on GET route', errorConnectingtoDB);
            res.sendStatus(501);
        } else{
            var queryText = 'SELECT * FROM "pethotel_owners" JOIN "pethotel_pets" ON "pethotel_pets"."customer_id" = "pethotel_owners"."id" JOIN "pethotel_visits" ON "pethotel_visits"."petcheck" = "pethotel_pets"."id";';
            db.query(queryText, function(errorMakingQuery, result){
                done();
                if(errorMakingQuery){
                    conosle.log('error making DB query', errorMakingQuery)
                    res.sendStatus(501);
                } else {
                    res.send(result.rows);
                }

            });
        }
    });
}); //End GET route to get all of the pet names

//This GET route will get the owners' names
router.get('/owner', function(req, res){
    pool.connect(function(errorConnectingtoDB, db, done){
        if(errorConnectingtoDB){
            conosle.log('error connecting on GET route', errorConnectingtoDB);
            res.sendStatus(501);
        } else{
            var queryText = 'SELECT * FROM "pethotel_owners";';
            db.query(queryText, function(errorMakingQuery, result){
                done();
                if(errorMakingQuery){
                    conosle.log('error making DB query', errorMakingQuery)
                    res.sendStatus(501);
                } else {
                    res.send(result.rows);
                }

            });
        }
    });
}); //End GET route to get all of the owners' names

//This POST route will post the owners' names to the site
router.post('/owner', function(req, res){
    var ownerData = req.body;
    console.log(ownerData);

    pool.connect(function(errorConnectingtoDB, db, done){
        if(errorConnectingtoDB){
            conosle.log('error connecting to DB on owner POST', errorConnectingtoDB);
            res.sendStatus(501);
        } else {
            var queryText = 'INSERT INTO "pethotel_owners" ("firstname", "lastname") VALUES ($1, $2);';
        db.query(queryText, [ownerData.first, ownerData.last], function(errorMakingQuery, results){
            done();
            if(errorMakingQuery){
            conosle.log('error sending owner POST', error)
            res.sendStatus(501);
            } else{
                res.send(result.rows);
            }
        });
        }
    });
}); //End owner POST route

//This is the POST route that will POSt pets to the db
router.post('/pet', function(req, res){
    var petInfo = req.body;
    console.log(petInfo);

    pool.connect(function(errorConnectingtoDB, db, done){
        if(errorConnectingtoDB){
            console.log('error connecting to DB', errorConnectingtoDB)
            res.sendStatus(501);
        } else {
            var queryText = //Pet POST route info;
           db.query(queryText, [], function(errorMakingQuery, result){
               done();
               if(errorMakingQuery){
                   conosle.log('error sending PET post', error)
                   res.sendStatus(501);
               } else {
                   res.send(result.rows);
               }
           })
        }
    })
});//End pet POST route;

//This PUT route edits pets
router.put('/editItem/:id', function(req, res){
    var petID = req.params.id;
    var petEdit = req.body;
    console.log('Pet edits:', petEdit, petID);
    pool.connect(function(errorConnectingToDB, db, done){
        if(errorConnectingToDB){
            conosle.log('error PUT query', errorConnectingToDB);
            res.sendStatus(501);
        } else {
            var queryText = //PUT route edits
            db.query(queryText, , function(errorMakingQuery, result){
                if(errorMakingQuery){
                    conosle.log('error PUT query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            })
        }
    })
}); //End PUT route that edits pets

//This PUT route edits whether the pets are in the hospital or not
router.put('/inOut/:id', function(req, res){
    var inOutID = req.params.id;
    var petEdit = req.body;
    conosle.log('In out PUT:', inOutId, petEdit);
    pool.connect(function(errorConnectingToDB, db, done){
        if(errorConnectingToDB){
            conosle.log('PUT error', errorConnectingToDB);
            res.sendStatus(501);
        } else {
            var queryText = //query needed for in-out PUT edit;
            db.query(queryText, , function(errorMakingQuery, result){
                if(errorMakingQuery){
                    conosle.log('error PUT query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            })
        }
    })
}); //End PUT route that checks in/out

//This delete route deletes pets off the DB
router.delete('/deletePet/:id', function(req, res){
var petID = req.params.id;
conosle.log('DELETE pet id', petID);
pool.connect(function(errorConnectingToDB, db, done){
    if(errorConnectingToDB){
        console.log('error connecting to DB', errorConnectingToDB);
        res.sendStatus(500);
    } else {
        var queryText = 1234;
        db.query(queryText, [petID], function(errorMakingQuery, result){
            done();
            if(errorMakingQuery){
                console.log('error making query', errorMakingQuery);
            } else {
                res.send(result.rows);
            }
        })
    }
})
}); //end delete route



module.exports = router;