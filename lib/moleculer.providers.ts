import { ServiceBroker, Service, ServiceSchema } from 'moleculer';
import { getBrokerToken, getServiceToken } from './common/moleculer.utils';
import { DEFAULT_BROKER } from './moleculer.constants';
import { Provider } from '@nestjs/common';

export function createMoleculerProviders(
  brokerName: string = DEFAULT_BROKER,
  services: {
    name: string;
    schema: ServiceSchema;
    schemaMods?: ServiceSchema;
  }[] = [],
): Provider[] {
  const providers = (services || []).map(
    service => {
      // let name = service.schema.name;
      // let version = service.schema.version;
      // if (!Service.isPrototypeOf(service.schema) && service.schemaMods) {
      //   service.schema.name = name = service.schemaMods.name
      //   service.schema.version = version = service.schemaMods.version
      // }
      return {
        provide: getServiceToken(service.name),
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
        useFactory: (broker: ServiceBroker) =>
          broker.createService(service.schema, service.schemaMods),
        inject: [
          brokerName === DEFAULT_BROKER
            ? DEFAULT_BROKER
            : getBrokerToken(brokerName),
        ],
      };
    },
    // let s = service.schema
    // if (service.schemaMods)
    //   s = Service.mergeSchemas(service.schema, service.schemaMods);
  );
  return providers;
}
