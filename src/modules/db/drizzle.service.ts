import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

export const DRIZZLE_CLIENT = Symbol('DRIZZLE_CLIENT');

@Injectable()
export class DrizzleService {
  constructor(
    @Inject(DRIZZLE_CLIENT)
    readonly db: NodePgDatabase<typeof schema>,
  ) {}
}
