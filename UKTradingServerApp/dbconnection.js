//Linux db root password: welcome69!
var mysql = require('mysql');
//dev db connection
var connection = mysql.createConnection({
    host: 'trading.staffetc.com',
    user: 'tradingdevdb',
    password: 'welcome69',
    database: 'tradingdevdb'
});

//Productin db connection
// var connection = mysql.createConnection({
//     host: 'trading.staffetc.com',
//     user: 'tradingproddb',
//     password: 'welcome69',
//     database: 'tradingproddb'
// });



//Linux Production db connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'efootstep',
    password: 'Tradingdevdb!1',
    database: 'tradingproddb'
});


exports.dbconnection=connection;