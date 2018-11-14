"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
exports.__esModule = true;
var common_1 = require("@nestjs/common");
var rxjs_1 = require("rxjs");
var moleculer_utils_1 = require("./common/moleculer.utils");
var moleculer_constants_1 = require("./moleculer.constants");
var moleculer_1 = require("moleculer");
var MoleculerCoreModule = /** @class */ (function () {
    function MoleculerCoreModule(brokerName, moduleRef) {
        this.brokerName = brokerName;
        this.moduleRef = moduleRef;
    }
    MoleculerCoreModule_1 = MoleculerCoreModule;
    MoleculerCoreModule.forRoot = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var retryAttempts = options.retryAttempts, retryDelay = options.retryDelay, brokerName = options.brokerName, moleculerOptions = __rest(options, ["retryAttempts", "retryDelay", "brokerName"]);
        var moleculerBrokerName = brokerName
            ? moleculer_utils_1.getBrokerToken(brokerName)
            : moleculer_constants_1.DEFAULT_BROKER;
        var moleculerBrokerNameProvider = {
            provide: moleculer_constants_1.MOLECULER_BROKER_NAME,
            useValue: moleculerBrokerName
        };
        var brokerProvider = {
            provide: moleculerBrokerName,
            useFactory: function () { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, rxjs_1.defer(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, new moleculer_1.ServiceBroker(moleculerOptions)];
                            }); }); })
                                .pipe(moleculer_utils_1.handleRetry(retryAttempts, retryDelay))
                                .toPromise()
                                .then(function (broker) {
                                broker.start();
                                return broker;
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); }
        };
        return {
            module: MoleculerCoreModule_1,
            providers: [brokerProvider, moleculerBrokerNameProvider],
            exports: [brokerProvider]
        };
    };
    MoleculerCoreModule.forRootAsync = function (options) {
        var _this = this;
        var moleculerBrokerName = options.brokerName
            ? moleculer_utils_1.getBrokerToken(options.brokerName)
            : moleculer_constants_1.DEFAULT_BROKER;
        var moleculerBrokerNameProvider = {
            provide: moleculer_constants_1.MOLECULER_BROKER_NAME,
            useValue: moleculerBrokerName
        };
        var brokerProvider = {
            provide: moleculerBrokerName,
            useFactory: function (moleculerModuleOptions) { return __awaiter(_this, void 0, void 0, function () {
                var retryAttempts, retryDelay, brokerName, moleculerOptions;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            retryAttempts = moleculerModuleOptions.retryAttempts, retryDelay = moleculerModuleOptions.retryDelay, brokerName = moleculerModuleOptions.brokerName, moleculerOptions = __rest(moleculerModuleOptions, ["retryAttempts", "retryDelay", "brokerName"]);
                            return [4 /*yield*/, rxjs_1.defer(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                    // moleculer.createBroker(
                                    //   moleculerModuleOptions.uri,
                                    //   moleculerOptions as any,
                                    // ),
                                    return [2 /*return*/, new moleculer_1.ServiceBroker(moleculerOptions)];
                                }); }); })
                                    .pipe(moleculer_utils_1.handleRetry(moleculerModuleOptions.retryAttempts, moleculerModuleOptions.retryDelay))
                                    .toPromise()
                                    .then(function (broker) {
                                    broker.start();
                                    return broker;
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); },
            inject: [moleculer_constants_1.MOLECULER_MODULE_OPTIONS]
        };
        var asyncProviders = this.createAsyncProviders(options);
        return {
            module: MoleculerCoreModule_1,
            imports: options.imports,
            providers: asyncProviders.concat([
                brokerProvider,
                moleculerBrokerNameProvider,
            ]),
            exports: [brokerProvider]
        };
    };
    MoleculerCoreModule.prototype.onModuleDestroy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var broker, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        broker = this.moduleRef.get(this.brokerName);
                        _a = broker;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, broker.stop()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        _a;
                        return [2 /*return*/];
                }
            });
        });
    };
    MoleculerCoreModule.createAsyncProviders = function (options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: options.useClass,
                useClass: options.useClass
            },
        ];
    };
    MoleculerCoreModule.createAsyncOptionsProvider = function (options) {
        var _this = this;
        if (options.useFactory) {
            return {
                provide: moleculer_constants_1.MOLECULER_MODULE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || []
            };
        }
        return {
            provide: moleculer_constants_1.MOLECULER_MODULE_OPTIONS,
            useFactory: function (optionsFactory) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, optionsFactory.createMoleculerOptions()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); },
            inject: [options.useExisting || options.useClass]
        };
    };
    var MoleculerCoreModule_1;
    MoleculerCoreModule = MoleculerCoreModule_1 = __decorate([
        common_1.Global(),
        common_1.Module({}),
        __param(0, common_1.Inject(moleculer_constants_1.MOLECULER_BROKER_NAME))
    ], MoleculerCoreModule);
    return MoleculerCoreModule;
}());
exports.MoleculerCoreModule = MoleculerCoreModule;
