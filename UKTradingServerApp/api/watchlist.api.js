var dbconnection = require("../dbconnection");
var express = require('express');
var responseModel = require("../models/ResponseModel");
var router = express.Router();
router.get('/all/:AuthToken', function (req, res) {
    try {
        var authToken = req.params.AuthToken;
        var watchlistAllDataQuery="select wl.* from UserAuthToken uat join UserWatchlists uwl on uat.UserId=uwl.UserId join Watchlist wl on uwl.Id=wl.WatchlistId where uat.AuthToken='"+authToken+"'";
        dbconnection.dbconnection.query(watchlistAllDataQuery, function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(responseModel.PrepareResponse(results, responseModel.ResponseType.Success, "Data fetched Successfully")));
        });
    } catch (err) {
        res.end(JSON.stringify(responseModel.PrepareResponse(err, responseModel.ResponseType.Error, "Something went wrong during watchlist load")));
    }

});

router.get('/default/:AuthToken', function (req, res) {
    var authToken = req.params.AuthToken;
    var getSymbolsQuery="select wl.Symbol from UserAuthToken uat join UserWatchlists uwl on uat.UserId=uwl.UserId join Watchlist wl on uwl.Id=wl.WatchlistId where uat.AuthToken='"+authToken+"' limit 1";   
    dbconnection.dbconnection.query(getSymbolsQuery, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(responseModel.PrepareResponse(results, responseModel.ResponseType.Success, "Data fetched Successfully")));
    });
});

router.post('/add/symbol', function (req, res) {
    var requestBody = req.body;
    var authToken = requestBody.AuthToken;    
    var getDefaultWatchListIdQuery = "select uwl.Id from UserAuthToken uat join UserWatchlists uwl on uat.UserId=uwl.UserId where uat.AuthToken='" + authToken + "' limit 1";    
    dbconnection.dbconnection.query(getDefaultWatchListIdQuery, function (error, results, fields) {
        if (error) throw error;
        var defaultWatchListId=results[0].Id;        
        var symbolAddQuery="INSERT INTO `Watchlist`(`Symbol`, `Price`, `Percentage`, `Name`, `IsDefault`,`WatchlistId`) VALUES ('" + requestBody.Symbol + "','--','--','--','0',"+defaultWatchListId+")";        
        dbconnection.dbconnection.query(symbolAddQuery, function (error, results, fields) {
            if (error) {res.end(JSON.stringify(responseModel.PrepareResponse(JSON.stringify(error), responseModel.ResponseType.Error, "Symbol add failed")));}
            res.end(JSON.stringify(responseModel.PrepareResponse(results, responseModel.ResponseType.Success, "Symbol Added Successfully")));
        });        
    });
});

module.exports.router = router;