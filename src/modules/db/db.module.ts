import { Inject, Module, OnModuleDestroy } from '@nestjs/common';
import { DrizzleService, DRIZZLE_CLIENT } from './drizzle.service';
import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

const PG_POOL = Symbol('PG_POOL');

@Module({
  providers: [
    {
      provide: PG_POOL,
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        new Pool({
          connectionString: config.getOrThrow<string>('DATABASE_URL'),
        }),
    },
    {
      provide: DRIZZLE_CLIENT,
      inject: [PG_POOL],
      useFactory: (pool: Pool) => drizzle(pool, { schema }),
    },
    DrizzleService,
  ],
  exports: [DrizzleService],
})
export class DbModule implements OnModuleDestroy {
  constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
  }
}
