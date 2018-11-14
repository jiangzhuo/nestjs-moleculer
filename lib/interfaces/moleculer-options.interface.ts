import { Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';

export interface MoleculerModuleOptions {
  [key: string]: any;
  brokerName?: string;
}

export interface MoleculerOptionsFactory {
  createMoleculerOptions():
    | Promise<MoleculerModuleOptions>
    | MoleculerModuleOptions;
}

export interface MoleculerModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  brokerName?: string;
  useExisting?: Type<MoleculerOptionsFactory>;
  useClass?: Type<MoleculerOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<MoleculerModuleOptions> | MoleculerModuleOptions;
  inject?: any[];
}
