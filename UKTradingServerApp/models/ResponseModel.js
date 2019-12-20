module.exports.PrepareResponse = function (data, type,message) {
    return { Data: data, Type: type, Message:message };
}

module.exports.ResponseType={Error:"Error",Success:"Success",Warning:"Warning"}