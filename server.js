
/*************************************************************************
* BTI325– Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic
Policy. No part * of this assignment has been copied manually or electronically from any
other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Zuber Farah Student ID: 106089212  Date: Oct 9 ,2022
*
* Your app’s URL (from Cyclic) : https://real-gold-nematode-veil.cyclic.app
*
*************************************************************************/ 

var express = require("express"); // Include express.js module
var app = express();

var path = require("path"); // include moduel path to use dirname, and function path.join()

var HTTP_PORT = process.env.PORT || 8080;  //  : or

// call this function after the http server starts listening for requests
function onHttpStart(){
    console.log("Express http server listening on: " + HTTP_PORT);
}
var data_server = require('./data-service');

// setup a 'route' to listen on the default url path (http://localhost/)
app.use(express.static('public'));




app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

 // setup another route to listen on /about
app.get("/about", function (req, res){
    res.sendFile(path.join(__dirname, "/views/about.html"));
});
app.get('/employees', function (req, res) {
    data_server.getAllEmployees().then((data) => {res.json(data);})
      .catch((err) => {res.json({ message: err });
      });
    });
    app.get('/managers', function (req, res) {
    data_server.getManagers().then((data) => {
        res.json(data);})
      .catch((err) => {res.json({ message: err });
          });
      });
      app.get('/departments', function (req, res) {
        data_server.getDepartments().then((data) => {res.json(data);})
          .catch((err) => {res.json({ message: err });
        });
      });
      app.get('*', function (req, res) {
        res.send('Uh Oh! Error 404: File Not Found');
      });

      //setup http server to listen on HTTP_PORT
      data_server.initialize().then(() => {
          app.listen(HTTP_PORT, onHttpStart);
        })
        .catch(function (err) {console.log(err);});
        
    
