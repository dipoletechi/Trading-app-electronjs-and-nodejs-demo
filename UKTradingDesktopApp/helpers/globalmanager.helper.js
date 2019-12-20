let moduleExport = module.exports;
global.userAuthToken='';
moduleExport.setUserAuthToken = function (authToken) {
    global.userAuthToken = authToken;
}