import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../db/drizzle.service';
import { users } from '../db/schema';
import { RoleEnum } from './enums/role.enum';
import { eq } from 'drizzle-orm';
import * as schema from '../db/schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly drizzle: DrizzleService) {}

  async findAll(role?: RoleEnum) {
    const result = await this.drizzle.db
      .select()
      .from(users)
      .where(role ? eq(users.role, role): undefined);

    return result;
  }

  findDuplicateUser(email: string) {
    const [result] = await this.drizzle.db
      .select()
      .from(users)
      .where(eq(users.email, email));

    return result;
  }

  async create(createUser: CreateUserDto) {
    const result = await this.drizzle.db
      .insert(schema.users)
      .values(createUser)
      .returning();
    
    return result;
  }
}
