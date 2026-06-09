import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../db/drizzle.service';
import { eq } from 'drizzle-orm';
import * as schema from '../db/schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindAllQueryDto } from './dto/find-all-query.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly drizzle: DrizzleService) {}

  async findAll(query?: FindAllQueryDto) {
    const result = await this.drizzle.db
      .select()
      .from(schema.users)
      .where(query?.role ? eq(schema.users.role, query.role) : undefined);

    return result;
  }

  async findOne(id: string) {
    const [result] = await this.drizzle.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id))
      .limit(1);

    return result ?? null;
  }

  async findDuplicateUser(email: string) {
    const [result] = await this.drizzle.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email));

    return result;
  }

  async create(createUserDto: CreateUserDto) {
    const result = await this.drizzle.db
      .insert(schema.users)
      .values(createUserDto)
      .returning();

    return result;
  }

  async update(id: string, updatedUserDto: UpdateUserDto) {
    const [result] = await this.drizzle.db
      .update(schema.users)
      .set(updatedUserDto)
      .where(eq(schema.users.id, id))
      .returning();

    return result;
  }

  async delete(id: string) {
    const [result] = await this.drizzle.db
      .delete(schema.users)
      .where(eq(schema.users.id, id))
      .returning();

    return result;
  }
}
