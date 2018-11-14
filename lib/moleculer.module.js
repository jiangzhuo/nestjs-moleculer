"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var common_1 = require("@nestjs/common");
var moleculer_core_module_1 = require("./moleculer-core.module");
var moleculer_constants_1 = require("./moleculer.constants");
var moleculer_providers_1 = require("./moleculer.providers");
var MoleculerModule = /** @class */ (function () {
    function MoleculerModule() {
    }
    MoleculerModule_1 = MoleculerModule;
    MoleculerModule.forRoot = function (options) {
        if (options === void 0) { options = {}; }
        return {
            module: MoleculerModule_1,
            imports: [moleculer_core_module_1.MoleculerCoreModule.forRoot(options)]
        };
    };
    MoleculerModule.forRootAsync = function (options) {
        return {
            module: MoleculerModule_1,
            imports: [moleculer_core_module_1.MoleculerCoreModule.forRootAsync(options)]
        };
    };
    MoleculerModule.forFeature = function (services, brokerName) {
        if (services === void 0) { services = []; }
        if (brokerName === void 0) { brokerName = moleculer_constants_1.DEFAULT_BROKER; }
        var providers = moleculer_providers_1.createMoleculerProviders(brokerName, services);
        return {
            module: MoleculerModule_1,
            providers: providers,
            exports: providers
        };
    };
    var MoleculerModule_1;
    MoleculerModule = MoleculerModule_1 = __decorate([
        common_1.Module({})
    ], MoleculerModule);
    return MoleculerModule;
}());
exports.MoleculerModule = MoleculerModule;
