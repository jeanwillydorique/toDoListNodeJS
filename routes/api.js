var express = require('express');
var router = express.Router();
var express = require('express');
var router = express.Router();
var moment = require('moment');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var ObjectID = require('mongodb').ObjectID;
var uri = "http://192.168.33.30/"


// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'toDoList'



// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    if (err) return console.log(err)
    const db = client.db(dbName);


//Middleware 

router.use(function (req, res, next) {
    res.setHeader('Content-type', 'application/json')
    next();
});


/* GET users listing. */
router.put('/:id', function(req, res, next) {

    console.log(req.body)

    ID = req.params.id
    objId = new ObjectID(req.params.id); 

    // db.collection('toDos').updateOne({ "_id" : objId  }, {$set : req.body})

    // db.collection('toDos').findOne({ "_id" : objId }).then(function(result) {

    //     //modifier une seule ligne avec $set

    //     console.log(req.body)

    //     // if ( result.state === false ) {
    //     //      newState = true
    //     //  } else {
    //     //      newState = false
    //     //  }

    //     // db.collection('toDos').update(
    //     //         { "_id" : objId  },
    //     //         {   
    //     //             title : result.title,
    //     //             content : result.content,
    //     //             creation_date : result.creation_date,
    //     //             updated_date : new Date(),
    //     //             state : newState, 
    //     //             user : result.user,
    //     //             deadLine : '',
    //     //         })
    //     // return res.redirect(uri)

     db.collection('toDos').updateOne({ "_id" : objId  }, {  $set : req.body }, function(err, result){
        if(err) return next(err);
        db.collection('toDos').findOne({ "_id" : objId }, function(err, doc){
            if(err) return next(err);
            console.log(doc.state)
            //if ( doc.state === false )
            //{
                res.render('tododone', {val : doc}, function(err, html){
                    console.log(html)
                    if(err) return next(err);
                    return res.json({
                        response : html
                    })
                })
            // } else {
            //     res.render('todonotdone', {val : doc}, function(err, html){
            //         console.log(html)
            //         if(err) return next(err);
            //         return res.json({
            //             response : html
            //         })
            //     })
            // }

        })
    })
    //   })
});

router.get('/:id', function(req, res, next) {
    console.log(req.params.id)
    //objId = new ObjectID(params.id); 
    //db.collection('toDos').deleteOne( { "_id" : ObjectId("563237a41a4d68582c2509da") } );
});

router.delete('/:id', function(req, res, next) {
    if(err) return next(err);
    //console.log(req.params.id)
    objId = new ObjectID(req.params.id); 
    db.collection('toDos').deleteOne( { "_id" : objId } );
    console.log(res.json)
    return res.json({
        
     })
});

router.post('/', function(req, res, next) {
        if(err) return next(err);

        db.collection('toDos').insertOne(req.body, function(err, result){
            if(err) return next(err);
            objId = new ObjectID(result.insertedId); 
            db.collection('toDos').findOne({ "_id" : objId }, function(err, doc){
                if(err) return next(err);
                console.log(doc)
                //if ( doc.state === false )
                //{
                    res.render('tododone', {val : doc}, function(err, html){
                        console.log(html)
                        if(err) return next(err);
                        return res.json({
                            response : html
                        })
                });
            });
        });
    });


router.post('/order', function(req, res, next) {

    //console.log(req.body)

    //let isOk = 0;
    req.body.forEach(function(id,pos){
        let objId = new ObjectID(id); 
        console.log(pos)
        console.log(id)
        db.collection('toDos').updateOne(
            { "_id" : id  }, 
            {  $set : { position : pos } },
            // function(err, result){
            //      if(err || !result.ok) isOk = 1 ;
            //  }
        )
        //console.log(pos)
    })
    res.json({})

});
            // objId = new ObjectID(req.params.id); 
            // //let newOrder = result.sort(-1)
        

            // var arrSorted = result.sort(function(a, b) {

            //     function getIndex(x) { 
            //       return data.indexOf(x.color);
            //     }
            //     console.log(getIndex(b))  
            //     return (getIndex(a) - getIndex(b)) || (a - b._id);
            // });

            //console.log(arrSorted)  


            // data.forEach(element => {
            //     let id = element
            //     result.forEach(el => {
            //         if (id = el._id) {
            //         console.log(el) 
            //         }
            //     });
            // });

            //resultat.push(result)

});

module.exports = router;