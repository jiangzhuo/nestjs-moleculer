import { DynamicModule, Module } from '@nestjs/common';
import {
  MoleculerModuleAsyncOptions,
  MoleculerModuleOptions,
} from './interfaces/moleculer-options.interface';
import { MoleculerCoreModule } from './moleculer-core.module';
import { DEFAULT_BROKER } from './moleculer.constants';
import { createMoleculerProviders } from './moleculer.providers';
import { ServiceSchema } from 'moleculer';

@Module({})
export class MoleculerModule {
  static forRoot(options: MoleculerModuleOptions = {}): DynamicModule {
    return {
      module: MoleculerModule,
      imports: [MoleculerCoreModule.forRoot(options)],
    };
  }

  static forRootAsync(options: MoleculerModuleAsyncOptions): DynamicModule {
    return {
      module: MoleculerModule,
      imports: [MoleculerCoreModule.forRootAsync(options)],
    };
  }

  static forFeature(
    services: {
      name: string;
      schema: ServiceSchema;
      schemaMods?: ServiceSchema;
    }[] = [],
    brokerName: string = DEFAULT_BROKER,
  ): DynamicModule {
    const providers = createMoleculerProviders(brokerName, services);
    return {
      module: MoleculerModule,
      providers: providers,
      exports: providers,
    };
  }
}
