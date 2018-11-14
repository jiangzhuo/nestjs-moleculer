"use strict";
exports.__esModule = true;
var common_1 = require("@nestjs/common");
var operators_1 = require("rxjs/operators");
function getServiceToken(name) {
    return name + "|MoleculerService";
}
exports.getServiceToken = getServiceToken;
function getBrokerToken(name) {
    return name + "|MoleculerBroker";
}
exports.getBrokerToken = getBrokerToken;
function handleRetry(retryAttempts, retryDelay) {
    if (retryAttempts === void 0) { retryAttempts = 9; }
    if (retryDelay === void 0) { retryDelay = 3000; }
    return function (source) {
        return source.pipe(operators_1.retryWhen(function (e) {
            return e.pipe(operators_1.scan(function (errorCount, error) {
                common_1.Logger.error("Unable to connect to the database. Retrying (" + (errorCount +
                    1) + ")...", '', 'MongooseModule');
                if (errorCount + 1 >= retryAttempts) {
                    throw error;
                }
                return errorCount + 1;
            }, 0), operators_1.delay(retryDelay));
        }));
    };
}
exports.handleRetry = handleRetry;
