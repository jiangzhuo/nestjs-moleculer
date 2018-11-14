"use strict";
exports.__esModule = true;
var moleculer_utils_1 = require("./common/moleculer.utils");
var moleculer_constants_1 = require("./moleculer.constants");
function createMoleculerProviders(brokerName, services) {
    if (brokerName === void 0) { brokerName = moleculer_constants_1.DEFAULT_BROKER; }
    if (services === void 0) { services = []; }
    var providers = (services || []).map(function (service) {
        // let name = service.schema.name;
        // let version = service.schema.version;
        // if (!Service.isPrototypeOf(service.schema) && service.schemaMods) {
        //   service.schema.name = name = service.schemaMods.name
        //   service.schema.version = version = service.schemaMods.version
        // }
        return {
            provide: moleculer_utils_1.getServiceToken(service.name),
            // useFactory: (broker: ServiceBroker) => {
            //   // let schema = broker.normalizeSchemaConstructor(service.schema);
            //   // let s = service.schema
            //   // if (service.schemaMods)
            //   //   s = broker.ServiceFactory.mergeSchemas(service.schema, service.schemaMods);
            //   // let service = new broker.ServiceFactory(broker, s);
            //   // service.__filename = '/home/jiangzhuo/Desktop/test-client/service-es6.js'
            //   // broker.watchService(service)
            //   return service
            // },
            useFactory: function (broker) {
                return broker.createService(service.schema, service.schemaMods);
            },
            inject: [
                brokerName === moleculer_constants_1.DEFAULT_BROKER
                    ? moleculer_constants_1.DEFAULT_BROKER
                    : moleculer_utils_1.getBrokerToken(brokerName),
            ]
        };
    });
    return providers;
}
exports.createMoleculerProviders = createMoleculerProviders;
