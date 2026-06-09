import { pgEnum } from 'drizzle-orm/pg-core';
import { varchar } from 'drizzle-orm/pg-core';
import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { ROLES } from '../users/entities/user.entity';

export const userRoles = pgEnum('role', ROLES);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  role: userRoles('role').notNull(),
});
