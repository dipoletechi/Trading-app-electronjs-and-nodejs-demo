var dbconnection = require("../dbconnection");
var crypto = require('crypto');
var express = require('express');
var responseModel = require("../models/ResponseModel");
var router = express.Router();

router.post('/register', function (req, res) {
    try {
        var requestBody = req.body;
        var password = requestBody.Password;
        var userName = requestBody.UserName;
        if (userName == undefined || userName == null || userName == "" || !validateEmail(userName)) {
            res.end(JSON.stringify(responseModel.PrepareResponse("", responseModel.ResponseType.Error, "Email is not valid")));
            return;
        }

        if (password == undefined || password == null || password == "") {
            res.end(JSON.stringify(responseModel.PrepareResponse("", responseModel.ResponseType.Error, "Invalid password")));
            return;
        }

        //Verify if user already exists
        dbconnection.dbconnection.query("SELECT Email FROM Users where Email='" + userName + "' limit 1;", function (error, results, fields) {
            if (error) {
                res.end(JSON.stringify(responseModel.PrepareResponse(error, responseModel.ResponseType.Error, "Error in finding existing users")));
            };
            if (results.length <= 0) {
                var salt = genRandomString(16); /** Gives us salt of length 16 */
                var passwordHash = saltHashPassword(password, salt);
                var insertUser = "INSERT INTO `Users`(`Email`, `HashPassword`, `HashPasswordSalt`, `LoginAttempts`, `IsLocked`, `IsDeleted`, `CreatedOn`, `UpdatedOn`, `IsActive`)" +
                    "VALUES ('" + userName + "','" + passwordHash + "','" + salt + "',0,0,0, UTC_TIMESTAMP(), UTC_TIMESTAMP(),1)";

                dbconnection.dbconnection.query(insertUser, function (error, results, fields) {                    
                    var insertedUserId=results.insertId;
                    if (error) { res.end(JSON.stringify(responseModel.PrepareResponse(error, responseModel.ResponseType.Error, "Error in user registration please try again"))); };
                    //Prepare a default watchlist for user
                    var insertDefaultWatchList="INSERT INTO `UserWatchlists`(`WatchListName`,`CreatedOn`,`UpdatedOn`,`UserId`) VALUES('Default',UTC_TIMESTAMP(),UTC_TIMESTAMP(),'"+insertedUserId+"');";                        
                    dbconnection.dbconnection.query(insertDefaultWatchList, function (error, results, fields) {                                           
                        res.end(JSON.stringify(responseModel.PrepareResponse(results, responseModel.ResponseType.Success, userName + " registered successfully")));
                    });
                });


            }
            else {
                res.end(JSON.stringify(responseModel.PrepareResponse("User already exists", responseModel.ResponseType.Warning, "User already exists")));
            }

        });

    } catch (error) {
        res.end(JSON.stringify(responseModel.PrepareResponse("", responseModel.ResponseType.Error, "Error in registration")));
    }
});

router.post('/login', function (req, res) {
    var loginAttemptsAllowed = 15;
    var requestBody = req.body;
    var password = requestBody.Password;
    var userName = requestBody.UserName;
    //Check user exists or not
    var findQuery = "SELECT * FROM Users where Email='" + userName + "' limit 1";
    dbconnection.dbconnection.query(findQuery, function (error, results, fields) {
        if (error) {
            res.end(JSON.stringify(responseModel.PrepareResponse(error, responseModel.ResponseType.Error, "Error in finding user")));
        };

        //User not exists
        if (results.length <= 0) {
            res.end(JSON.stringify(responseModel.PrepareResponse("", responseModel.ResponseType.Error, "Invalid UserId/Password")));
        }
        //User exists
        else {
            var userData = results[0];
            var userId = userData.Id;
            var salt = userData.HashPasswordSalt;
            var loginAttempts = userData.LoginAttempts;
            var userOriginalHashPassword = userData.HashPassword;
            var userInputHasPassword = saltHashPassword(password, salt);
            //If password not matched        
            if (userOriginalHashPassword != userInputHasPassword) {

                if (userData.IsLocked ==0) {
                    var totalLoginAttempts = (loginAttempts + 1);
                    var updateLoginAttempts = "UPDATE `Users` SET `LoginAttempts` = " + totalLoginAttempts + ", `LastLoginAttemptOn` = utc_timestamp() WHERE `Id` = " + userId + ";"

                    if (totalLoginAttempts >= loginAttemptsAllowed) {
                        updateLoginAttempts = "UPDATE `Users` SET 'IsLocked'=1, `LoginAttempts` = " + totalLoginAttempts + ", `LastLoginAttemptOn` = utc_timestamp() WHERE `Id` = " + userId + ";"
                    }
                    dbconnection.dbconnection.query(updateLoginAttempts, function (error, results, fields) {
                        if (totalLoginAttempts >= loginAttemptsAllowed) {
                            res.end(JSON.stringify(responseModel.PrepareResponse("", responseModel.ResponseType.Error, "Your account is locked, because of too many invalid login attempts")));
                        }
                        else {
                            res.end(JSON.stringify(responseModel.PrepareResponse("", responseModel.ResponseType.Error, "Invalid UserId/Password")));
                        }
                    });
                }
                else{
                    res.end(JSON.stringify(responseModel.PrepareResponse("", responseModel.ResponseType.Error, "Your account is locked, because of too many invalid login attempts")));
                    return;
                }

            }
            //If password matched then check for userauth token if token exists then send else
            //create new auth token and send with response
            else {
                var checkAuthToken = "SELECT AuthToken FROM UserAuthToken where UserId=" + userId + " Limit 1";
                dbconnection.dbconnection.query(checkAuthToken, function (error, results, fields) {
                    if (error) { res.end(JSON.stringify(responseModel.PrepareResponse(error, responseModel.ResponseType.Error, "Something went wrong while login please try again"))); };
                    if (results.length > 0) {
                        var authToken = results[0].AuthToken;
                        var resetLoginAttempts = "UPDATE `Users` SET `LoginAttempts` = 0,`IsLocked`=0, `LastLoginAttemptOn` = utc_timestamp() WHERE `Id` = " + userId + ";"
                        dbconnection.dbconnection.query(resetLoginAttempts, function (error, results, fields) {
                            res.end(JSON.stringify(responseModel.PrepareResponse({ AuthToken: authToken }, responseModel.ResponseType.Success, userName + " logged in successfully")));
                        });
                    }
                    else {
                        var createNewAuthToken = "INSERT INTO `UserAuthToken`(`AuthToken`,`CreatedOn`,`ExpiresOn`,`UserId`) VALUES (uuid(), UTC_TIMESTAMP(), UTC_TIMESTAMP()+365,'" + userId + "');";
                        dbconnection.dbconnection.query(createNewAuthToken, function (error, results, fields) {
                            if (error) { res.end(JSON.stringify(responseModel.PrepareResponse(error, responseModel.ResponseType.Error, "Something went wrong during loging please try again."))); };

                            var authtokenId = results.insertId;
                            var getAuthToken = "SELECT AuthToken FROM UserAuthToken where Id=" + authtokenId + " Limit 1";
                            dbconnection.dbconnection.query(getAuthToken, function (error, results, fields) {
                                if (error) { res.end(JSON.stringify(responseModel.PrepareResponse(error, responseModel.ResponseType.Error, "Error in user registration please try again"))); };
                                var authToken = results[0].AuthToken;
                                var resetLoginAttempts = "UPDATE `Users` SET `LoginAttempts` = 0,`IsLocked`=0, `LastLoginAttemptOn` = utc_timestamp() WHERE `Id` = " + userId + ";"
                                dbconnection.dbconnection.query(resetLoginAttempts, function (error, results, fields) {
                                    res.end(JSON.stringify(responseModel.PrepareResponse({ AuthToken: authToken }, responseModel.ResponseType.Success, userName + " logged in successfully")));
                                });

                            });
                        });

                    }

                });

            }
        }
    });
});

router.get('/verifyTokenAndGetUserDetails/:AuthToken', function (req, res) {
    try {                
        var authToken = req.params.AuthToken;                                   
        var userDetailQuery="SELECT Email FROM UserAuthToken uat join Users u on uat.UserId=u.id where uat.AuthToken='"+authToken+"' LIMIT 1";        
        dbconnection.dbconnection.query(userDetailQuery, function (error, results, fields) {            
            if(error)
                throw error;            

            if(results==undefined || results==null || results==''|| results.length<=0){
                res.end(JSON.stringify(responseModel.PrepareResponse("", responseModel.ResponseType.Error, "Information not verified")));            
            }
            else{
                res.end(JSON.stringify(responseModel.PrepareResponse(results[0], responseModel.ResponseType.Success, "Information verified")));            
            }
            
        });
    } catch (error) {
        res.end(JSON.stringify(responseModel.PrepareResponse("", responseModel.ResponseType.Error, "Error in getting user details")));
    }
});



module.exports.router = router;

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = function (length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0, length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512 = function (password, salt) {
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var passwordHash = hash.digest('hex');
    return passwordHash;
};


function saltHashPassword(userpassword, salt) {
    var passwordData = sha512(userpassword, salt);
    return passwordData;
}

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};