import { Inject } from '@nestjs/common';
import { DEFAULT_BROKER } from '../moleculer.constants';
import { getBrokerToken, getServiceToken } from './moleculer.utils';

export const InjectService = (name: string) => Inject(getServiceToken(name));

export const InjectBroker = (name?: string) =>
  Inject(name ? getBrokerToken(name) : DEFAULT_BROKER);
