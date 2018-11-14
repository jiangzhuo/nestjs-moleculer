"use strict";
exports.__esModule = true;
var common_1 = require("@nestjs/common");
var moleculer_constants_1 = require("../moleculer.constants");
var moleculer_utils_1 = require("./moleculer.utils");
exports.InjectService = function (name) { return common_1.Inject(moleculer_utils_1.getServiceToken(name)); };
exports.InjectBroker = function (name) {
    return common_1.Inject(name ? moleculer_utils_1.getBrokerToken(name) : moleculer_constants_1.DEFAULT_BROKER);
};
