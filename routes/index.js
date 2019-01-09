var express = require('express');
var router = express.Router();
var moment = require('moment');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'toDoList';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  if (err) return console.log(err)
  const db = client.db(dbName);

  router.get('/', (req, res) => {
    db.collection('toDos').find().toArray((err, result) => {
      var date = moment(result[0].creation_date).format("DD MMMM");
      var user = result[0].user;
      //console.log(result)
      res.render('index', { 
        date : date,
        datas : result, 
        user : user,
        title: 'TodoList'
      })
    })
  })

  router.delete('/', (req, res) => {
    db.collection('toDos').find().toArray((err, result) => {
      var date = moment(result[0].creation_date).format("DD MMMM");
      res.render('index', { 
        data : result[0], 
        date : date,
        datas : result, 
        title: 'TodoList'
      })
    })
  })

  router.put('/', (req, res) => {
    db.collection('toDos').find().toArray((err, result) => {
      var date = moment(result[0].creation_date).format("DD MMMM");
      res.render('index', { 
        data : result[0], 
        date : date,
        datas : result, 
        title: 'TodoList'
      })
    })
  })

});



/* GET home page. */

module.exports = router;
