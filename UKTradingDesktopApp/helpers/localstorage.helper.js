const storage = require('electron-json-storage');
const globalManager = require('./globalmanager.helper');
var key = 'authkey';
let moduleExport = module.exports;
//authentication
moduleExport.getAuthToken = function () {
    var authToken = '';
    storage.has(key, function (error, hasKey) {
        if (error) throw error;        
        if (hasKey) {
            storage.get(key, function (error, data) {                                
                globalManager.setUserAuthToken(data.authToken);
            });
        }
    });
}

moduleExport.removeAuthToken = function () {
    
    storage.has(key, function (error, hasKey) {
        if (hasKey) {
            storage.remove(key, function (error) {
                globalManager.setUserAuthToken('');               
            });
        }
    })
}


moduleExport.setAuthToken = function (token) {
    storage.has(key, function (error, hasKey) {
        if (hasKey) {
            storage.remove(key, function (error) {
                storage.set(key, { authToken: token }, function (error) {
                    globalManager.setUserAuthToken(token);
                });
            });
        }else{            
            storage.set(key, { authToken: token }, function (error) {
                globalManager.setUserAuthToken(token);
            });
        }
    })
}

//Close authentication
