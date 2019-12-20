var http = require("http");
var express = require('express');
var router=express.Router();
var watchlistapi=require("./api/watchlist.api");
var authenticationapi=require("./api/authentication.api");

var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use("/api/watchlist", watchlistapi.router);
app.use("/api/auth", authenticationapi.router);

//Localhost config
var server = app.listen(3000, "127.0.0.1", function () {
    var host = server.address().address
    var port = server.address().port  
    console.log("Trading app listening at http://%s:%s", host, port)  
});

//Production Server config
// var server = app.listen(3000, "0.0.0.0", function () {
//     var host = server.address().address
//     var port = server.address().port  
//     console.log("Trading app listening at http://%s:%s", host, port)  
// });