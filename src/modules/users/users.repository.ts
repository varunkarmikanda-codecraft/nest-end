import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../db/drizzle.service';
import { eq } from 'drizzle-orm';
import * as schema from '../db/schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindAllQueryDto } from './dto/find-all-query.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly drizzle: DrizzleService) {}

  async findAll(query?: FindAllQueryDto): Promise<UserDto[]> {
    const result = await this.drizzle.db
      .select()
      .from(schema.users)
      .where(query?.role ? eq(schema.users.role, query.role) : undefined);

    return result;
  }

  async findOne(id: string): Promise<UserDto | null> {
    const [result] = await this.drizzle.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id))
      .limit(1);

    return result ?? null;
  }

  async findDuplicateUser(email: string): Promise<UserDto | null> {
    const [result] = await this.drizzle.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email));

    return result ?? null;
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const [result] = await this.drizzle.db
      .insert(schema.users)
      .values(createUserDto)
      .returning();

    return result;
  }

  async update(
    id: string,
    updatedUserDto: UpdateUserDto,
  ): Promise<UserDto | null> {
    const [result] = await this.drizzle.db
      .update(schema.users)
      .set(updatedUserDto)
      .where(eq(schema.users.id, id))
      .returning();

    return result ?? null;
  }

  async delete(id: string): Promise<UserDto | null> {
    const [result] = await this.drizzle.db
      .delete(schema.users)
      .where(eq(schema.users.id, id))
      .returning();

    return result ?? null;
  }
}
