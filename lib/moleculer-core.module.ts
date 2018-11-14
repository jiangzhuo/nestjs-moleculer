import {
  DynamicModule,
  Global,
  Inject,
  Module,
  Provider,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import * as moleculer from 'moleculer';
import { defer } from 'rxjs';
import { getBrokerToken, handleRetry } from './common/moleculer.utils';
import {
  MoleculerModuleAsyncOptions,
  MoleculerModuleOptions,
  MoleculerOptionsFactory,
} from './interfaces/moleculer-options.interface';
import {
  DEFAULT_BROKER,
  MOLECULER_BROKER_NAME,
  MOLECULER_MODULE_OPTIONS,
} from './moleculer.constants';
import { ServiceBroker } from 'moleculer';
import { BrokerOptions } from 'moleculer';

@Global()
@Module({})
export class MoleculerCoreModule {
  constructor(
    @Inject(MOLECULER_BROKER_NAME) private readonly brokerName: string,
    private readonly moduleRef: ModuleRef,
  ) {}

  static forRoot(options: MoleculerModuleOptions = {}): DynamicModule {
    const {
      retryAttempts,
      retryDelay,
      brokerName,
      ...moleculerOptions
    } = options;

    const moleculerBrokerName = brokerName
      ? getBrokerToken(brokerName)
      : DEFAULT_BROKER;

    const moleculerBrokerNameProvider = {
      provide: MOLECULER_BROKER_NAME,
      useValue: moleculerBrokerName,
    };
    const brokerProvider = {
      provide: moleculerBrokerName,
      useFactory: async (): Promise<any> =>
        await defer(
          async () => new ServiceBroker(moleculerOptions as BrokerOptions),
        )
          .pipe(handleRetry(retryAttempts, retryDelay))
          .toPromise()
          .then(broker => {
            broker.start();
            return broker;
          }),
    };
    return {
      module: MoleculerCoreModule,
      providers: [brokerProvider, moleculerBrokerNameProvider],
      exports: [brokerProvider],
    };
  }

  static forRootAsync(options: MoleculerModuleAsyncOptions): DynamicModule {
    const moleculerBrokerName = options.brokerName
      ? getBrokerToken(options.brokerName)
      : DEFAULT_BROKER;

    const moleculerBrokerNameProvider = {
      provide: MOLECULER_BROKER_NAME,
      useValue: moleculerBrokerName,
    };

    const brokerProvider = {
      provide: moleculerBrokerName,
      useFactory: async (
        moleculerModuleOptions: MoleculerModuleOptions,
      ): Promise<any> => {
        const {
          retryAttempts,
          retryDelay,
          brokerName,
          ...moleculerOptions
        } = moleculerModuleOptions;

        return await defer(
          async () =>
            // moleculer.createBroker(
            //   moleculerModuleOptions.uri,
            //   moleculerOptions as any,
            // ),
            new ServiceBroker(moleculerOptions as BrokerOptions),
        )
          .pipe(
            handleRetry(
              moleculerModuleOptions.retryAttempts,
              moleculerModuleOptions.retryDelay,
            ),
          )
          .toPromise()
          .then(broker => {
            broker.start();
            return broker;
          });
      },
      inject: [MOLECULER_MODULE_OPTIONS],
    };
    const asyncProviders = this.createAsyncProviders(options);
    return {
      module: MoleculerCoreModule,
      imports: options.imports,
      providers: [
        ...asyncProviders,
        brokerProvider,
        moleculerBrokerNameProvider,
      ],
      exports: [brokerProvider],
    };
  }

  async onModuleDestroy() {
    const broker = this.moduleRef.get<ServiceBroker>(this.brokerName);
    broker && (await broker.stop());
  }

  private static createAsyncProviders(
    options: MoleculerModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: MoleculerModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: MOLECULER_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: MOLECULER_MODULE_OPTIONS,
      useFactory: async (optionsFactory: MoleculerOptionsFactory) =>
        await optionsFactory.createMoleculerOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
